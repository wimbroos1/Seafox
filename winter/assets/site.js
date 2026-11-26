// Gedeelde stukjes voor alle pagina's: iconen, kop en voet, foto's, seizoensthema (winter) en animaties.

const P = {
  pool: '<path d="M2 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M2 22c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8M8 13h8"/>',
  beach: '<path d="M3 21h18"/><path d="M12 21V8"/><path d="M4 9a8 8 0 0 1 16 0z"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8"/>',
  dog: '<path d="M10 5L8 3 5 6v4l3 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6l3-2V6l-3-3-2 2z"/><circle cx="10" cy="9" r=".6"/><circle cx="14" cy="9" r=".6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  bed: '<path d="M3 18V7M3 13h18v5M21 18v-5a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',
  bath: '<path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM6 12V5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2"/>',
  stairs: '<path d="M3 20h5v-5h5v-5h5V5h3"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r=".6"/><circle cx="16.5" cy="16" r=".6"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  nosmoke: '<path d="M3 3l18 18M3 14h9M16 14h5v3h-2M3 14v3h12"/><path d="M17 7c0-2 2-2 2-4"/>',
  moon: '<path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>',
  towel: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 8h14M9 13h6"/>',
  kitchen: '<path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10M16 21V3c-2 1-3 4-3 8h3"/>',
  desk: '<rect x="3" y="4" width="18" height="11" rx="1.5"/><path d="M8 20h8M12 15v5"/>',
  coffee: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>',
  terrace: '<path d="M4 21V11M20 21V11M2 11h20M7 7l5-4 5 4"/>',
  crib: '<rect x="4" y="8" width="16" height="9" rx="1"/><path d="M4 17v4M20 17v4M8 8v9M12 8v9M16 8v9"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevL: '<path d="M15 5l-7 7 7 7"/>',
  chevR: '<path d="M9 5l7 7-7 7"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.2"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  heart: '<path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/>',
  snow: '<path d="M12 2v20M4.2 7l15.6 10M19.8 7L4.2 17"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5M3.4 10.6l3.4-.9-.9-3.4M20.6 13.4l-3.4.9.9 3.4M20.6 10.6l-3.4-.9.9-3.4M3.4 13.4l3.4.9-.9 3.4"/>',
  skate: '<path d="M7 3v9l8 2a4 4 0 0 1 4 4H5V3z"/><path d="M3 21h17a2 2 0 0 0 2-2M8 18v3M16 18v3M7 7h3M7 10h3"/>',
  gift: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M2.5 9h19V6h-19zM12 6v14M12 6c-1-3-5-4-5-1.5S10 6 12 6zm0 0c1-3 5-4 5-1.5S14 6 12 6z"/>',
  mug: '<path d="M5 9h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 5c0-1 1-1 1-2M12 5c0-1 1-1 1-2"/>',
  tree: '<path d="M12 2l5 7h-3l4 6h-4l4 5H6l4-5H6l4-6H7zM12 20v2"/>',
  wave: '<path d="M2 9c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5-1M2 15c2.5-2 5-2 7.5 0s5 2 7.5 0 3.5-1.5 5-1"/>',
  bike: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-8h5l3 8M10 8l4 8M9 5h3"/>',
  bird: '<path d="M3 13c3-5 7-6 10-3 2-3 5-3 8-1-3 0-4 2-4 4a6 6 0 0 1-6 6H5l3-3c-2 0-4-1-5-3z"/>',
  ticket: '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4zM14 6v12"/>',
  fish: '<path d="M3 12c3-5 9-6 14-2l4-3v10l-4-3c-5 4-11 3-14-2z"/><circle cx="8" cy="11.5" r=".7"/>',
  shop: '<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  lift: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M12 3v18M8.5 10l-1.5 2h3zM15.5 14l1.5-2h-3z"/>',
  washer: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="4.5"/><path d="M7 6h2M12 6h.5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
};

export const icon = (name, cls = "") =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] ?? ""}</svg>`;

// Kiest een icoon bij een kenmerk uit apartments.json.
export function featureIcon(text) {
  const t = text.toLowerCase();
  if (t.includes("zwembad")) return "pool";
  if (t.includes("wifi")) return "wifi";
  if (t.includes("keuken")) return "kitchen";
  if (t.includes("werkplek")) return "desk";
  if (t.includes("koffie")) return "coffee";
  if (t.includes("terras")) return "terrace";
  if (t.includes("reisbed")) return "crib";
  if (t.includes("trap")) return "stairs";
  return "star";
}


// ---------- Foto's ----------
// Eigen illustratie per appartement; wordt getoond als een foto ontbreekt.
export const illustration = (apt) => `assets/illustrations/${apt.id}.svg`;

// Kleine versie van een foto (voor kaarten en miniaturen).
export const small = (src) => src.replace(/\.jpg$/, "-s.jpg");

// <img> met de eerste foto van het appartement, of de illustratie als die foto niet bestaat.
export function cover(apt, eager = false) {
  const first = apt.photos?.[0]?.src;
  const src = first ? small(first) : illustration(apt);
  return `<img src="${src}" alt="${apt.name}, ${apt.subtitle}" ${eager ? "" : 'loading="lazy"'} onerror="this.onerror=null;this.src='${illustration(apt)}'">`;
}

// ---------- Instellingen en seizoen ----------
// Waar de agenda met bezette nachten staat.
export const AVAILABILITY_URL = "../data/availability.json";

const pad = (n) => String(n).padStart(2, "0");
export const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

let sitePromise;
export const loadSite = () => (sitePromise ??= fetch("data/site.json").then((r) => r.json()).catch(() => ({})));

// Het winterthema staat aan als data/site.json dat zegt ("aan"), of vanzelf ("auto") tussen de twee datums.
export function winterActive(site) {
  const w = site.winter;
  if (!w || w.show === "uit") return false;
  if (w.show === "aan") return true;
  const today = isoDate(new Date());
  return today >= w.showFrom && today <= w.until;
}

const FOX = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 5l9 9h10l9-9-2 17-12 12L8 22z" fill="#ff6a3d"/><path d="M8 22h7l5 6 5-6h7L20 34z" fill="#ffd9b0"/><circle cx="15" cy="19" r="1.4" fill="#0a2230"/><circle cx="25" cy="19" r="1.4" fill="#0a2230"/><circle cx="20" cy="31.4" r="1.5" fill="#0a2230"/></svg>';
// In de wintereditie draagt de vos een muts.
const FOX_WINTER = FOX.replace("</svg>", '<path d="M21 13.5c2-7 8-11.5 15-9.5-3 1.5-3.5 5-2.5 9.5z" fill="#e63b2e"/><rect x="19.5" y="11.5" width="16" height="4.6" rx="2.3" fill="#fff"/><circle cx="36.5" cy="4" r="2.9" fill="#fff"/></svg>');

// ---------- Kop en voet (op elke pagina hetzelfde) ----------
function renderChrome(site, page, winter, apartments) {
  const links = [
    ["./#appartementen", "Appartementen", "home"],
    ["omgeving.html", "Omgeving", "omgeving"],
    ...(winter ? [["winter.html", "Winter", "winter"]] : []),
    ["praktisch.html", "Praktisch", "praktisch"],
  ];
  const header = document.getElementById("site-header");
  header.className = "hdr";
  header.innerHTML = `
    <div class="wrap">
      <a class="logo" href="./" aria-label="${winter ? "Seafox Winter" : "Seafox Blankenberge"}">${winter ? FOX_WINTER : FOX}<span>Seafox</span>${winter ? '<em class="edition">Winter</em>' : ""}</a>
      <nav class="nav" id="nav">
        ${links.map(([href, label, key]) => `<a href="${href}" ${key === page ? 'aria-current="page"' : ""}>${label}${key === "winter" ? '<i class="dot"></i>' : ""}</a>`).join("")}
        <a class="btn sm" href="./#appartementen">Boek rechtstreeks</a>
      </nav>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
    </div>`;
  const burger = document.getElementById("burger");
  const toggle = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => toggle(!document.body.classList.contains("menu-open")));
  header.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  const onScroll = () => header.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const email = site.email ?? "info@seafox.be";
  const footer = document.getElementById("site-footer");
  footer.className = "ftr";
  footer.innerHTML = `
    <div class="wrap">
      <div class="ftr-top">
        <div>
          <a class="logo" href="./">${winter ? FOX_WINTER : FOX}<span>Seafox</span>${winter ? '<em class="edition">Winter</em>' : ""}</a>
          <p>${winter ? "Drie warme appartementen in het hart van Blankenberge, met de schaatsbaan en de kerstmarkt op het plein voor de deur." : "Drie appartementen met dakzwembad in het hart van Blankenberge, op wandelafstand van het strand."}</p>
        </div>
        <div>
          <h4>Appartementen</h4>
          <ul>${apartments.map((a) => `<li><a href="appartement.html?id=${a.id}">${a.name} · ${a.subtitle}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Ontdek</h4>
          <ul>
            <li><a href="omgeving.html">Omgeving</a></li>
            ${winter ? '<li><a href="winter.html">Winter aan zee</a></li>' : ""}
            <li><a href="praktisch.html">Praktische info</a></li>
            <li><a href="./#zwembad">Dakzwembad</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Koning Leopold III-plein 15<br>8370 Blankenberge</li>
            <li><a href="mailto:${email}">${email}</a></li>
          </ul>
        </div>
      </div>
      <div class="ftr-legal"><span>© ${new Date().getFullYear()} Seafox Blankenberge</span><span>Inchecken vanaf 15 uur · Uitchecken voor 11 uur</span></div>
    </div>`;
}

// ---------- Winter: sneeuw en lichtjes ----------
// Zachte sneeuw over de hele pagina. Staat uit voor wie liever geen beweging ziet.
function startSnow() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.className = "snow";
  c.setAttribute("aria-hidden", "true");
  document.body.append(c);
  const ctx = c.getContext("2d");
  let w, h, flakes = [];
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(70, (w * h) / 22000));
    flakes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.2, v: 0.25 + Math.random() * 0.75, p: Math.random() * 6.3, o: 0.2 + Math.random() * 0.5 }));
  };
  size();
  addEventListener("resize", size);
  const tick = (t) => {
    if (!document.hidden) {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (const f of flakes) {
        f.y += f.v; f.x += Math.sin(t / 1400 + f.p) * 0.3;
        if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
        ctx.globalAlpha = f.o;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.3); ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Een slinger met lichtjes bovenaan elk blok met data-lights.
function hangLights() {
  const colors = ["#f5c451", "#ff6a3d", "#62d6d8", "#fff3d6"];
  document.querySelectorAll("[data-lights]").forEach((host) => {
    const spans = 5, W = 1200, H = 70;
    let wire = "", bulbs = "", k = 0;
    for (let s = 0; s < spans; s++) {
      const x0 = (W / spans) * s, x1 = (W / spans) * (s + 1), sag = 34 + (s % 2) * 10;
      wire += `M${x0} 4Q${(x0 + x1) / 2} ${4 + sag * 2} ${x1} 4`;
      for (let i = 1; i <= 6; i++) {
        const t = i / 7, x = x0 + (x1 - x0) * t, y = 4 + 2 * sag * 2 * t * (1 - t);
        const col = colors[k % colors.length];
        bulbs += `<circle cx="${x.toFixed(1)}" cy="${(y + 6).toFixed(1)}" r="4" fill="${col}" style="color:${col};animation-delay:${(k * 0.37) % 2.4}s"/>`;
        k++;
      }
    }
    host.insertAdjacentHTML("afterbegin", `<svg class="lights" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${wire}" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.2" vector-effect="non-scaling-stroke"/>${bulbs}</svg>`);
  });
}

// ---------- Vrije nachten tijdens de winterperiode ----------
const noon = (s) => new Date(s + "T12:00:00");
export const addDays = (s, n) => { const x = noon(s); x.setDate(x.getDate() + n); return isoDate(x); };
export const longDate = (s, year = false) => noon(s).toLocaleDateString("nl-BE", { day: "numeric", month: "long", ...(year ? { year: "numeric" } : {}) });
const shortDate = (s) => noon(s).toLocaleDateString("nl-BE", { weekday: "short", day: "numeric", month: "short" }).replace(/\./g, "");

// Toont per appartement de vrije periodes tussen vandaag en het einde van de winterperiode,
// uit dezelfde agenda als de kalender.
export async function renderFreeNights(el, noteEl, apartments, site) {
  const w = site.winter;
  const availability = await fetch(AVAILABILITY_URL).then((r) => r.json()).catch(() => null);
  if (!availability) {
    el.innerHTML = `<p class="muted">De agenda is nu even niet bereikbaar. Bekijk de beschikbaarheid op de pagina van elk appartement.</p>`;
    return;
  }
  const today = isoDate(new Date());
  const from = today > w.from ? today : w.from;
  el.innerHTML = apartments.map((a) => {
    const busy = new Set();
    for (const b of availability.apartments?.[a.id] ?? []) for (let x = b.start; x < b.end; x = addDays(x, 1)) busy.add(x);
    // Opeenvolgende vrije nachten samennemen tot periodes [aankomst, vertrek).
    const ranges = [];
    let start = null;
    for (let x = from; x <= w.until; x = addDays(x, 1)) {
      if (!busy.has(x)) start ??= x;
      else if (start) { ranges.push([start, x]); start = null; }
    }
    if (start) ranges.push([start, addDays(w.until, 1)]);
    const rows = ranges.map(([s, e]) => {
      const n = Math.round((noon(e) - noon(s)) / 864e5);
      return `<li><a href="appartement.html?id=${a.id}&arr=${s}&dep=${e}#boeken"><b>${shortDate(s)}</b> tot <b>${shortDate(e)}</b></a><span>${n} nacht${n > 1 ? "en" : ""}</span></li>`;
    }).join("") || `<li class="none">Volzet tijdens Winterpret</li>`;
    return `<div class="card">
      <h3><small>${a.name} · ${a.guests} gasten</small>${a.subtitle}</h3>
      <ul>${rows}</ul>
      <a class="link" href="appartement.html?id=${a.id}">Bekijk het appartement ${icon("arrow")}</a>
    </div>`;
  }).join("");
  if (noteEl && availability.updated) {
    const t = new Date(availability.updated).toLocaleString("nl-BE", { dateStyle: "medium", timeStyle: "short" });
    noteEl.textContent = `Agenda laatst bijgewerkt: ${t}. Vertrekken kan ook op een dag waarop een volgende gast aankomt.`;
  }
}

// ---------- Animaties ----------
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  els.forEach((e) => io.observe(e));
}

export function fillIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon));
    el.removeAttribute("data-icon");
  });
}

// Start alles wat elke pagina nodig heeft. Geeft de instellingen, appartementen en het seizoen terug.
export async function initSite(page) {
  const [site, apartments, photos] = await Promise.all([
    loadSite(),
    fetch("data/apartments.json").then((r) => r.json()),
    fetch("assets/photos/manifest.json").then((r) => r.json()).catch(() => ({})),
  ]);
  // De foto's per appartement komen uit de lijst die de foto-workflow bijhoudt.
  for (const a of apartments) a.photos = photos[a.id] ?? [];
  const winter = winterActive(site);
  document.documentElement.classList.toggle("winter", winter);
  renderChrome(site, page, winter, apartments);
  // Blokken die alleen in de winter (of net niet) zichtbaar mogen zijn.
  document.querySelectorAll("[data-season]").forEach((el) => { if ((el.dataset.season === "winter") !== winter) el.remove(); });
  fillIcons();
  if (winter) { startSnow(); hangLights(); }
  initReveal();
  return { site, apartments, winter };
}
