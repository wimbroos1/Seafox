import { icon, featureIcon, cover, existingPhotos, initHeader, initReveal } from "./site.js";

const CONTACT_EMAIL = "info@seafox.be";
const MONTHS_SHOWN = 2;

const params = new URLSearchParams(location.search);
const [apartments, availability] = await Promise.all([
  fetch("data/apartments.json").then((r) => r.json()),
  fetch("data/availability.json").then((r) => (r.ok ? r.json() : { apartments: {} })).catch(() => ({ apartments: {} })),
]);
const apt = apartments.find((a) => a.id === params.get("id")) ?? apartments[0];

// ---------- Inhoud ----------
document.title = `${apt.name} · ${apt.subtitle} | Seafox Blankenberge`;
document.getElementById("title").textContent = apt.name;
document.getElementById("subtitle").textContent = apt.subtitle;
document.getElementById("summary").textContent = apt.summary;
document.getElementById("rating").innerHTML = `${icon("star")} ${apt.rating} op Airbnb`;
document.getElementById("specs").innerHTML = [
  ["users", `${apt.guests} gasten`, "maximaal"],
  ["bed", `${apt.bedrooms} slaapkamer${apt.bedrooms > 1 ? "s" : ""}`, apt.beds],
  ["bath", "Badkamer", apt.bathrooms.replace(/^1 badkamer en /, "plus ")],
  ["stairs", apt.floor, "met lift"],
].map(([i, b, s]) => `<li>${icon(i)}<b>${b}</b><span>${s}</span></li>`).join("");
document.getElementById("features").innerHTML = apt.features.map((f) => `<li>${icon(featureIcon(f))}${f}</li>`).join("");
document.getElementById("adults").max = apt.guests;

document.getElementById("arch").innerHTML = cover(apt, true);
document.getElementById("foot-apts").innerHTML = apartments.map((a) => `<li><a href="appartement.html?id=${a.id}">${a.name} · ${a.subtitle}</a></li>`).join("");
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Galerij en lichtbak ----------
// De galerij verschijnt vanzelf zodra er echte foto's in assets/photos/<nummer>/ staan.
existingPhotos(apt).then((photos) => {
  if (!photos.length) return;
  const g = document.getElementById("gallery");
  g.innerHTML = photos.map((p) => `<img src="${p.src}" alt="${p.label}" loading="lazy">`).join("");
  const lb = document.getElementById("lightbox");
  let cur = 0;
  const show = (i) => {
    cur = (i + photos.length) % photos.length;
    document.getElementById("lb-img").src = photos[cur].src;
    document.getElementById("lb-img").alt = photos[cur].label;
    document.getElementById("lb-cap").textContent = `${photos[cur].label} · ${cur + 1} / ${photos.length}`;
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  };
  const close = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
  g.querySelectorAll("img").forEach((img, i) => img.addEventListener("click", () => show(i)));
  document.getElementById("lb-x").innerHTML = icon("close");
  document.getElementById("lb-prev").innerHTML = icon("chevL");
  document.getElementById("lb-next").innerHTML = icon("chevR");
  document.getElementById("lb-x").onclick = close;
  document.getElementById("lb-prev").onclick = () => show(cur - 1);
  document.getElementById("lb-next").onclick = () => show(cur + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
});

// ---------- Datums ----------
// Een boeking [start, end) bezet de nachten van start tot de dag voor end.
const pad = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (s, n) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return iso(d); };
const today = iso(new Date());

const busy = new Set();
for (const b of availability.apartments?.[apt.id] ?? []) {
  for (let d = b.start; d < b.end; d = addDays(d, 1)) busy.add(d);
}
const rangeFree = (a, b) => { for (let d = a; d < b; d = addDays(d, 1)) if (busy.has(d)) return false; return true; };

if (availability.updated) {
  const t = new Date(availability.updated).toLocaleString("nl-BE", { dateStyle: "medium", timeStyle: "short" });
  document.getElementById("updated").textContent = `Klik op je aankomstdag en daarna op je vertrekdag. Laatst bijgewerkt: ${t}.`;
}

// ---------- Kalender ----------
let offset = 0;
let arr = null, dep = null;
const arrInput = document.getElementById("arr");
const depInput = document.getElementById("dep");
arrInput.min = today;
depInput.min = today;

function renderMonth(year, month) {
  const first = new Date(year, month, 1);
  const label = first.toLocaleDateString("nl-BE", { month: "long", year: "numeric" });
  const lead = (first.getDay() + 6) % 7; // maandag eerst
  const days = new Date(year, month + 1, 0).getDate();
  let cells = ["ma", "di", "wo", "do", "vr", "za", "zo"].map((d) => `<div class="dow">${d}</div>`).join("");
  cells += "<div></div>".repeat(lead);
  for (let i = 1; i <= days; i++) {
    const d = `${year}-${pad(month + 1)}-${pad(i)}`;
    const cls = ["day"];
    if (d < today) cls.push("past");
    else if (busy.has(d) && d !== dep) cls.push("busy");
    if (d === arr || d === dep) cls.push("sel");
    else if (arr && dep && d > arr && d < dep) cls.push("range");
    cells += `<div class="${cls.join(" ")}" data-d="${d}">${i}</div>`;
  }
  return `<div class="cal-month"><h4>${label}</h4><div class="cal-grid">${cells}</div></div>`;
}

function render() {
  const now = new Date();
  let html = "";
  for (let i = 0; i < MONTHS_SHOWN; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset + i, 1);
    html += renderMonth(d.getFullYear(), d.getMonth());
  }
  document.getElementById("months").innerHTML = html;
  document.getElementById("prev").disabled = offset === 0;
  document.getElementById("next").disabled = offset >= 16;
  const n = arr && dep ? nights() : 0;
  document.getElementById("nights").innerHTML = n > 0 ? `<span>${n} nacht${n > 1 ? "en" : ""}</span><span>${apt.name}</span>` : "";
}

function setMsg(text, err = false) {
  const el = document.getElementById("formMsg");
  el.textContent = text;
  el.className = "form-msg" + (err ? " err" : "");
}

const nights = () => Math.round((new Date(dep) - new Date(arr)) / 864e5);

function pick(d) {
  if (d < today) return;
  // Een bezette dag kan nog wel je vertrekdag zijn (de volgende gast komt pas na je vertrek aan).
  if (!arr || dep || d <= arr) {
    if (busy.has(d)) return setMsg("Die nacht is al bezet. Kies een andere aankomstdag.", true);
    arr = d; dep = null;
    setMsg("Kies nu je vertrekdag.");
  } else {
    if (!rangeFree(arr, d)) return setMsg("Er zit een bezette nacht in die periode. Kies een andere periode.", true);
    dep = d;
    setMsg("");
  }
  arrInput.value = arr ?? "";
  depInput.value = dep ?? "";
  render();
}

document.getElementById("months").addEventListener("click", (e) => {
  const d = e.target.closest(".day")?.dataset.d;
  if (d) pick(d);
});
document.getElementById("prev").innerHTML = icon("chevL");
document.getElementById("next").innerHTML = icon("chevR");
document.getElementById("prev").onclick = () => { offset = Math.max(0, offset - 1); render(); };
document.getElementById("next").onclick = () => { offset += 1; render(); };
arrInput.onchange = () => { arr = arrInput.value || null; render(); };
depInput.onchange = () => { dep = depInput.value || null; render(); };

// Datums meegegeven vanaf de zoekbalk op de startpagina.
if (params.get("arr")) { arr = params.get("arr"); arrInput.value = arr; }
if (params.get("dep")) { dep = params.get("dep"); depInput.value = dep; }
if (arr) {
  const a = new Date(arr + "T12:00:00"), now = new Date();
  offset = Math.max(0, (a.getFullYear() - now.getFullYear()) * 12 + a.getMonth() - now.getMonth());
  if (dep && !rangeFree(arr, dep)) setMsg("Let op: deze periode is (deels) bezet. Kies andere data in de kalender.", true);
}
render();

// ---------- Aanvraag ----------
// Voorlopig zonder server: de aanvraag opent een kant-en-klare e-mail naar Seafox.
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = (k) => document.getElementById(k).value.trim();
  arr = v("arr"); dep = v("dep");
  if (!arr || !dep || dep <= arr) return setMsg("Kies een geldige aankomst- en vertrekdatum.", true);
  if (arr < today) return setMsg("De aankomstdatum ligt in het verleden.", true);
  if (!rangeFree(arr, dep)) return setMsg("Deze periode is (deels) bezet. Kies andere data.", true);
  const guests = Number(v("adults")) + Number(v("kids"));
  if (guests > apt.guests) return setMsg(`${apt.name} is geschikt voor maximaal ${apt.guests} gasten.`, true);
  if (!v("name") || !/^\S+@\S+\.\S+$/.test(v("email"))) return setMsg("Vul je naam en een geldig e-mailadres in.", true);

  const fmt = (s) => new Date(s + "T12:00:00").toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const body = [
    `Appartement: ${apt.name} (${apt.subtitle})`,
    `Aankomst: ${fmt(arr)}`,
    `Vertrek: ${fmt(dep)} (${nights()} nachten)`,
    `Volwassenen: ${v("adults")}, kinderen: ${v("kids")}`,
    `Hond: ${v("dog")}`,
    "",
    `Naam: ${v("name")}`,
    `E-mail: ${v("email")}`,
    `Telefoon: ${v("phone") || "-"}`,
    "",
    v("msg"),
  ].join("\n");
  const subject = `Aanvraag ${apt.name}: ${arr} tot ${dep}`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setMsg("Je e-mailprogramma opent met je aanvraag. Verstuur die e-mail om af te ronden.");
});

initHeader();
initReveal();
