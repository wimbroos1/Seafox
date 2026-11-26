// Haalt de eigen Airbnb-foto's van Seafox op en bewaart ze in assets/photos/.
// Draait op GitHub (zie .github/workflows/fetch-photos.yml). Bronnen: data/photo-sources.json.
// Elke foto komt er in twee maten: groot (NN.jpg) en klein (NN-s.jpg, voor kaarten en miniaturen).
// De website leest de lijst uit assets/photos/manifest.json.
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const sources = JSON.parse(await readFile("data/photo-sources.json", "utf8"));

async function download(url, width) {
  const res = await fetch(`${url}?im_w=${width}`, { headers: { "user-agent": UA, accept: "image/jpeg,image/*" }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000 || buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("geen JPEG");
  return buf;
}

// Haalt een lijst foto's op. Pas als alles binnen is, worden de oude bestanden in de map vervangen.
async function fetchSet(dir, items, nameOf) {
  const done = [];
  for (const [i, item] of items.entries()) {
    try {
      const [large, small] = [await download(item.url, sources.width), await download(item.url, sources.smallWidth)];
      done.push({ item, large, small });
    } catch (err) {
      console.log(`  overgeslagen: ${item.label} (${err.message})`);
    }
  }
  if (!done.length) return null;
  await mkdir(dir, { recursive: true });
  for (const f of await readdir(dir)) if (f.endsWith(".jpg")) await rm(`${dir}/${f}`);
  const out = [];
  for (const [i, d] of done.entries()) {
    const name = nameOf(d.item, i);
    await writeFile(`${dir}/${name}.jpg`, d.large);
    await writeFile(`${dir}/${name}-s.jpg`, d.small);
    out.push({ src: `${dir}/${name}.jpg`, label: d.item.label, ...(d.item.name ? { name: d.item.name } : {}) });
    console.log(`  ${dir}/${name}.jpg (${Math.round(d.large.length / 1024)} kB): ${d.item.label}`);
  }
  return out;
}

const previous = JSON.parse(await readFile("assets/photos/manifest.json", "utf8").catch(() => "{}"));
const manifest = {};
let total = 0;
for (const [id, items] of Object.entries(sources.apartments)) {
  console.log(`Appartement ${id}`);
  const result = await fetchSet(`assets/photos/${id}`, items, (_, i) => String(i + 1).padStart(2, "0"));
  manifest[id] = result ?? previous[id] ?? [];
  total += result?.length ?? 0;
}
console.log("Algemeen");
const general = await fetchSet("assets/photos/algemeen", sources.general ?? [], (item) => item.name);
manifest.algemeen = general ?? previous.algemeen ?? [];
total += general?.length ?? 0;

await writeFile("assets/photos/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Klaar: ${total} foto's opgehaald.`);
if (total === 0) process.exit(1);
