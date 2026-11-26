// Synchroniseert de beschikbaarheid met Airbnb, in twee richtingen.
//
// 1. Importeren: haalt per appartement de iCal-link van Airbnb op (uit de
//    omgevingsvariabelen AIRBNB_ICAL_207, AIRBNB_ICAL_301, AIRBNB_ICAL_303)
//    en schrijft de bezette periodes naar data/availability.json.
// 2. Exporteren: zet de directe boekingen uit data/direct-bookings.json in
//    ical/<id>.ics. Die link geef je in Airbnb op bij "Agenda importeren",
//    zodat Airbnb die data ook blokkeert.
//
// Draait automatisch via .github/workflows/sync-calendars.yml.

import { readFile, writeFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const read = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));

const apartments = await read("data/apartments.json");
const direct = await read("data/direct-bookings.json");

// Zet een iCal-datum (20261224 of 20261224T150000Z) om naar 2026-12-24.
const toIso = (v) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
const toIcal = (iso) => iso.replaceAll("-", "");

export function parseIcal(text) {
  // Regels die met een spatie beginnen horen bij de vorige regel.
  const lines = text.replace(/\r\n[ \t]/g, "").split(/\r?\n/);
  const events = [];
  let cur = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT") {
      if (cur?.start && cur?.end) events.push(cur);
      cur = null;
    } else if (cur) {
      const m = line.match(/^(DTSTART|DTEND)[^:]*:(\d{8})/);
      if (m) cur[m[1] === "DTSTART" ? "start" : "end"] = toIso(m[2]);
    }
  }
  return events;
}

function buildIcal(id, bookings) {
  const events = bookings.map(
    (b, i) => [
      "BEGIN:VEVENT",
      `UID:seafox-${id}-${b.start}-${i}@seafox.be`,
      `DTSTAMP:${toIcal(b.start)}T000000Z`,
      `DTSTART;VALUE=DATE:${toIcal(b.start)}`,
      `DTEND;VALUE=DATE:${toIcal(b.end)}`,
      "SUMMARY:Seafox - direct geboekt",
      "END:VEVENT",
    ].join("\r\n")
  );
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Seafox//Beschikbaarheid//NL",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

const availability = { updated: new Date().toISOString(), apartments: {} };
let failures = 0;

for (const { id } of apartments) {
  const own = direct[id] ?? [];
  let fromAirbnb = [];
  const url = process.env[`AIRBNB_ICAL_${id}`];
  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fromAirbnb = parseIcal(await res.text());
      console.log(`${id}: ${fromAirbnb.length} periodes van Airbnb`);
    } catch (err) {
      failures++;
      console.error(`${id}: Airbnb-agenda ophalen mislukt (${err.message})`);
      // Bewaar dan de vorige gegevens, zodat de site niet ten onrechte alles vrij toont.
      try {
        const prev = await read("data/availability.json");
        fromAirbnb = (prev.apartments[id] ?? []).filter((b) => b.source === "airbnb");
      } catch {}
    }
  } else {
    console.warn(`${id}: geen AIRBNB_ICAL_${id} ingesteld, Airbnb-boekingen overgeslagen`);
  }

  availability.apartments[id] = [
    ...fromAirbnb.map(({ start, end }) => ({ start, end, source: "airbnb" })),
    ...own.map(({ start, end }) => ({ start, end, source: "direct" })),
  ].sort((a, b) => a.start.localeCompare(b.start));

  await writeFile(new URL(`ical/${id}.ics`, root), buildIcal(id, own));
}

// Alleen herschrijven als er echt iets veranderd is, zodat er niet elk uur een lege wijziging komt.
let previous = null;
try { previous = await read("data/availability.json"); } catch {}
if (JSON.stringify(previous?.apartments) !== JSON.stringify(availability.apartments)) {
  await writeFile(new URL("data/availability.json", root), JSON.stringify(availability, null, 2) + "\n");
  console.log("Beschikbaarheid gewijzigd.");
}
console.log("Klaar.");
if (failures === apartments.length) process.exitCode = 1;
