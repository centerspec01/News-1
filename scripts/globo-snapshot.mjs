// Gera um retrato (clima + notícias) de todas as cidades do globo, no formato
// do documento `live/current` do banco do artefato "Globo ao Vivo".
// Uso: node scripts/globo-snapshot.mjs saida.json
// Clima: MET Norway (api.met.no). Notícias: Google News RSS em pt-BR.
import { readFile, writeFile } from "node:fs/promises";

const out = process.argv[2] || "globo-snapshot.json";
const cities = JSON.parse(await readFile(new URL("../docs/globo/cities.json", import.meta.url), "utf8"));
const UA = "globo-ao-vivo/1.0 github.com/centerspec01/News-1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const decode = (s = "") =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&amp;/g, "&").trim();
const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

async function weather(c) {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${c.lat.toFixed(2)}&lon=${c.lon.toFixed(2)}`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`clima HTTP ${r.status}`);
  const ts = (await r.json()).properties.timeseries;
  const now = ts.find((x) => new Date(x.time) >= new Date(Date.now() - 3600e3)) || ts[0];
  const d = now.data.instant.details;
  const next = now.data.next_1_hours || now.data.next_6_hours || {};
  const day = ts.filter((x) => new Date(x.time) < new Date(Date.now() + 24 * 3600e3)).map((x) => x.data.instant.details.air_temperature);
  return {
    t: d.air_temperature,
    hum: d.relative_humidity,
    wind: Math.round(d.wind_speed * 3.6),
    sym: next.summary?.symbol_code || "",
    rain: next.details?.precipitation_amount ?? null,
    min: Math.min(...day),
    max: Math.max(...day),
  };
}

async function news(c) {
  const q = encodeURIComponent(`${c.q} when:2d`);
  const r = await fetch(`https://news.google.com/rss/search?q=${q}&hl=pt-BR&gl=BR&ceid=BR:pt-419`, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`notícias HTTP ${r.status}`);
  const xml = await r.text();
  const seen = new Set();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, it]) => {
      const source = tag(it, "source");
      let title = tag(it, "title");
      if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3));
      const link = tag(it, "link");
      return { title, link: link.startsWith("https://") ? link : "", source, date: new Date(tag(it, "pubDate")).toISOString() };
    })
    .filter((n) => n.title && !seen.has(n.title) && seen.add(n.title))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);
}

const snap = { updated: new Date().toISOString(), source: "MET Norway · Google News", cities: {} };
let okW = 0, okN = 0;
for (const c of cities) {
  const entry = {};
  try { entry.w = await weather(c); okW++; } catch (e) { console.warn(c.name, e.message); }
  try { entry.news = await news(c); okN++; } catch (e) { console.warn(c.name, e.message); entry.news = []; }
  snap.cities[c.id] = entry;
  await sleep(250);
}
await writeFile(out, JSON.stringify(snap));
console.log(`Clima ${okW}/${cities.length}, notícias ${okN}/${cities.length} → ${out}`);
