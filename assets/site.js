// Gedeelde stukjes voor alle pagina's: iconen, foto's met nette plaatshouder, kop die van kleur verandert.

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

// Eigen illustratie per appartement; wordt getoond zolang er geen foto is.
export const illustration = (apt) => `assets/illustrations/${apt.id}.svg`;

// <img> met de eerste foto van het appartement, of de illustratie als die foto (nog) niet bestaat.
export function cover(apt, eager = false) {
  const first = apt.photos?.[0]?.src ?? illustration(apt);
  return `<img src="${first}" alt="${apt.name}, ${apt.subtitle}" ${eager ? "" : 'loading="lazy"'} onerror="this.onerror=null;this.src='${illustration(apt)}'">`;
}

// Geeft alleen de foto's terug die echt bestaan.
export function existingPhotos(apt) {
  return Promise.all((apt.photos ?? []).map((p) => new Promise((res) => {
    const img = new Image();
    img.onload = () => res(p);
    img.onerror = () => res(null);
    img.src = p.src;
  }))).then((list) => list.filter(Boolean));
}

// Kop: transparant boven de openingsfoto, wit zodra je scrolt.
export function initHeader() {
  const h = document.querySelector(".site-header");
  if (!h) return;
  const onScroll = () => h.classList.toggle("solid", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  document.querySelectorAll("[data-icon]").forEach((el) => el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon)));
}

// Elementen zacht laten verschijnen als ze in beeld komen.
export function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}
