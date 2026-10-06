// Converts a raw Plone API export into the compact restaurant format used by
// the rest of the data files (data-YYYY.json).
//
// Usage: node scripts/convert.mjs -i app/data/data-2026-input.json
//        node scripts/convert.mjs --input file.json --output out.json

import { readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

const parseArgs = (argv) => {
  const args = { input: null, output: null, year: null };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "-i" || arg === "--input") {
      args.input = argv[(i += 1)];
    } else if (arg === "-o" || arg === "--output") {
      args.output = argv[(i += 1)];
    } else if (arg === "-y" || arg === "--year") {
      args.year = Number(argv[(i += 1)]);
    } else if (!args.input) {
      // allow a bare positional input path
      args.input = arg;
    }
  }

  return args;
};

const args = parseArgs(process.argv.slice(2));

if (!args.input) {
  console.error(
    "Usage: node scripts/convert.mjs -i <input.json> [-o <output.json>] [-y <year>]",
  );
  process.exit(1);
}

const inputPath = args.input;

// Derive the year from an explicit flag, the filename, or the data itself.
const yearFromName = (name) => {
  const match = basename(name).match(/(\d{4})/);
  return match ? Number(match[1]) : null;
};

const outputPath =
  args.output ??
  inputPath.replace(/-input(?=\.json$)/i, "").replace(/\.json$/i, ".json");

const COURSE_ORDER = [
  "antipasto",
  "primo",
  "secondo",
  "contorno",
  "dessert",
  "menu_unico",
];

/** Strip tags/entities to test whether an HTML fragment carries real content. */
const textContent = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isEmptyHtml = (html) => textContent(html).length === 0;

/** Normalise an HTML fragment: drop empty tags, stray <br>, redundant wrappers. */
const cleanHtml = (rawHtml) => {
  if (!rawHtml) return "";

  let html = rawHtml
    .replace(/\u00a0/g, " ")
    .replace(/&nbsp;/gi, " ")
    // leading <br> right after an opening tag
    .replace(/(<(?:p|div)>)\s*(?:<br\s*\/?>\s*)+/gi, "$1")
    // trailing <br> right before a closing tag
    .replace(/(?:\s*<br\s*\/?>)+\s*(<\/(?:p|div)>)/gi, "$1")
    // collapse runs of <br>
    .replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>")
    // drop empty paragraphs
    .replace(/<p>\s*<\/p>/gi, "")
    // drop empty divs
    .replace(/<div>\s*<\/div>/gi, "")
    // trim whitespace hugging the inside of block tags
    .replace(/(<(?:p|div)>)\s+/gi, "$1")
    .replace(/\s+(<\/(?:p|div)>)/gi, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

  // unwrap a single outer <div> that just wraps the whole fragment
  const outerDiv = html.match(/^<div>([\s\S]*)<\/div>$/i);
  if (outerDiv && !/<div>/i.test(outerDiv[1])) {
    html = outerDiv[1].trim();
  }

  return isEmptyHtml(html) ? "" : html;
};

const getRichText = (field) =>
  field && typeof field === "object" && typeof field.data === "string"
    ? field.data
    : "";

const buildDescription = (menuItem) =>
  COURSE_ORDER.map((course) => cleanHtml(getRichText(menuItem[course])))
    .filter(Boolean)
    .join("");

const CUISINE_TYPE_BY_TOKEN = {
  carne: "carne",
  pesce: "pesce",
  "vegano-vegetariano": "vegetariana/vegana",
};

/** Map the raw `tipologia_cucina` tokens onto the compact cuisine types. */
const buildCuisineTypes = (menuItem) =>
  (Array.isArray(menuItem.tipologia_cucina) ? menuItem.tipologia_cucina : [])
    .map((entry) => CUISINE_TYPE_BY_TOKEN[entry?.token])
    .filter(Boolean);

const buildAddress = (ristorante) => {
  const street = (ristorante.street ?? "").trim();
  const comune = (ristorante.comune ?? ristorante.city ?? "").trim();

  return [street, comune].filter(Boolean).join(", ");
};

const nullableText = (value) => {
  const text = (value ?? "").toString().trim();
  return text.length > 0 ? text : null;
};

const raw = JSON.parse(readFileSync(inputPath, "utf8"));
const items = Array.isArray(raw.items) ? raw.items : [];

const year =
  args.year ||
  yearFromName(inputPath) ||
  (items[0]?.ristorante?.anno && Number(items[0].ristorante.anno)) ||
  new Date().getFullYear();

const restaurantsByUid = new Map();

for (const item of items) {
  const ristorante = item.ristorante;
  if (!ristorante) continue;

  const uid = ristorante.UID ?? ristorante.id ?? ristorante.title;

  const menu = {
    title: nullableText(item.title) ?? undefined,
    description: buildDescription(item),
    price: Number(item.prezzo) || 0,
    cousineType: buildCuisineTypes(item),
    notes: cleanHtml(getRichText(item.note)) || null,
  };

  if (!restaurantsByUid.has(uid)) {
    const description = cleanHtml(getRichText(ristorante.descrizione_estesa));
    const phone =
      nullableText(ristorante.cellulare) ?? nullableText(ristorante.telefono);

    const restaurant = {
      id: ristorante.UID ?? undefined,
      name: (ristorante.title ?? "").trim(),
      ...(description ? { description } : {}),
      phone,
      address: buildAddress(ristorante),
      mail: nullableText(ristorante.email),
      place: (ristorante.comune ?? ristorante.city ?? "").trim(),
      year,
      menus: [],
    };

    restaurantsByUid.set(uid, restaurant);
  }

  restaurantsByUid.get(uid).menus.push(menu);
}

// Drop `title` keys that ended up undefined so the JSON stays clean.
const restaurants = Array.from(restaurantsByUid.values()).map((restaurant) => ({
  ...restaurant,
  menus: restaurant.menus.map((menu) => {
    const { title, ...rest } = menu;
    return title ? { title, ...rest } : rest;
  }),
}));

restaurants.sort((a, b) => a.name.localeCompare(b.name, "it"));

writeFileSync(outputPath, `${JSON.stringify(restaurants, null, 2)}\n`, "utf8");

console.log(
  `Wrote ${restaurants.length} restaurants (${restaurants.reduce(
    (sum, r) => sum + r.menus.length,
    0,
  )} menus) to ${outputPath}`,
);
