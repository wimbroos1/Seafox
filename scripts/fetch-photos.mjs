// Haalt de eigen Airbnb-foto's van Seafox op en bewaart ze in assets/photos/<nummer>/.
// Draait op GitHub (zie .github/workflows/fetch-photos.yml). Bronnen: data/photo-sources.json.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const sources = JSON.parse(await readFile("data/photo-sources.json", "utf8"));
const MAX_PER_APARTMENT = sources.max ?? 16;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const manifest = {};

// Probeert extra foto's te vinden op de advertentiepagina zelf (alleen foto's van die advertentie).
async function discover(listing) {
  try {
    const id = listing.match(/rooms\/(\d+)/)[1];
    const res = await fetch(listing, { headers: { "user-agent": UA, "accept-language": "nl-BE,nl;q=0.9" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = (await res.text()).replaceAll("\\u002F", "/");
    const re = new RegExp(`https://a0\\.muscache\\.com/im/pictures/hosting/Hosting-${id}/original/[0-9a-f-]+\\.jpe?g`, "g");
    return [...new Set(html.match(re) ?? [])];
  } catch (err) {
    console.log(`  advertentiepagina niet leesbaar (${err.message}), ik gebruik de vaste lijst`);
    return [];
  }
}

for (const [id, src] of Object.entries(sources.apartments)) {
  console.log(`Appartement ${id}`);
  const extra = src.listing && sources.discover ? await discover(src.listing) : [];
  const urls = [...new Set([...src.photos, ...extra])].slice(0, MAX_PER_APARTMENT);
  console.log(`  ${src.photos.length} vaste en ${extra.length} gevonden foto's, ${urls.length} om op te halen`);
  await mkdir(`assets/photos/${id}`, { recursive: true });
  manifest[id] = [];
  let n = 0;
  for (const url of urls) {
    try {
      const res = await fetch(`${url}?im_w=${sources.width}`, { headers: { "user-agent": UA, accept: "image/jpeg,image/*" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000 || buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("geen JPEG");
      n += 1;
      const file = `assets/photos/${id}/${String(n).padStart(2, "0")}.jpg`;
      await writeFile(file, buf);
      manifest[id].push({ src: file, url, bytes: buf.length });
      console.log(`  ${file} (${Math.round(buf.length / 1024)} kB)`);
    } catch (err) {
      console.log(`  overgeslagen: ${url.split("/").pop()} (${err.message})`);
    }
  }
}

await writeFile("assets/photos/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
const total = Object.values(manifest).reduce((s, a) => s + a.length, 0);
console.log(`Klaar: ${total} foto's opgehaald.`);
if (total === 0) process.exit(1);
