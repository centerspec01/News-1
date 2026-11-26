// Busca notícias recentes de cada cidade do globo (Google News RSS, pt-BR)
// e grava em docs/globo/news.json. Sem dependências: Node 18+.
import { readFile, writeFile } from "node:fs/promises";

const ROOT = new URL("../docs/globo/", import.meta.url);
const PER_CITY = 6;

const cities = JSON.parse(await readFile(new URL("cities.json", ROOT), "utf8"));

const decode = (s = "") =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&amp;/g, "&")
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

async function fetchCity(city) {
  const q = encodeURIComponent(`${city.q} when:2d`);
  const url = `https://news.google.com/rss/search?q=${q}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (globo-news-bot)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
    const source = tag(it, "source");
    let title = tag(it, "title");
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3));
    return { title, link: tag(it, "link"), source, date: new Date(tag(it, "pubDate")).toISOString() };
  });
  const seen = new Set();
  return items
    .filter((n) => n.title && !seen.has(n.title) && seen.add(n.title))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, PER_CITY);
}

let previous = {};
try {
  previous = JSON.parse(await readFile(new URL("news.json", ROOT), "utf8")).cities || {};
} catch {}

const out = { updated: new Date().toISOString(), cities: {} };
let ok = 0;
for (const city of cities) {
  try {
    out.cities[city.id] = await fetchCity(city);
    ok++;
  } catch (e) {
    console.warn(`${city.name}: ${e.message} (mantendo notícias anteriores)`);
    out.cities[city.id] = previous[city.id] || [];
  }
  await new Promise((r) => setTimeout(r, 400));
}

if (ok === 0) {
  console.error("Nenhuma cidade atualizada; news.json não foi alterado.");
  process.exit(1);
}
await writeFile(new URL("news.json", ROOT), JSON.stringify(out, null, 1) + "\n");
console.log(`news.json atualizado: ${ok}/${cities.length} cidades.`);
