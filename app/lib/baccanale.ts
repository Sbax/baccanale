import data2005 from "../data/data-2005.json";
import data2006 from "../data/data-2006.json";
import data2007 from "../data/data-2007.json";
import data2008 from "../data/data-2008.json";
import data2009 from "../data/data-2009.json";
import data2010 from "../data/data-2010.json";
import data2011 from "../data/data-2011.json";
import data2012 from "../data/data-2012.json";
import data2013 from "../data/data-2013.json";
import data2014 from "../data/data-2014.json";
import data2015 from "../data/data-2015.json";
import data2016 from "../data/data-2016.json";
import data2017 from "../data/data-2017.json";
import data2018 from "../data/data-2018.json";
import data2019 from "../data/data-2019.json";
import data2020 from "../data/data-2020.json";
import data2021 from "../data/data-2021.json";
import data2022 from "../data/data-2022.json";
import data2023 from "../data/data-2023.json";
import data2024 from "../data/data-2024.json";
import data2025 from "../data/data-2025.json";
import type { Menu, MenuWithYear, Restaurant, RestaurantPageData } from "../types";

type RawMenu = {
  title?: string;
  description: string;
  price: number | string;
  notes?: string | null;
};

type RawRestaurant = {
  id?: string;
  name: string;
  description?: string | null;
  phone?: string | null;
  mail?: string | null;
  address: string;
  place: string;
  year: number;
  menus: RawMenu[];
};

const yearDataByYear: Record<number, RawRestaurant[]> = {
  2005: data2005,
  2006: data2006,
  2007: data2007,
  2008: data2008,
  2009: data2009,
  2010: data2010,
  2011: data2011,
  2012: data2012,
  2013: data2013,
  2014: data2014,
  2015: data2015,
  2016: data2016,
  2017: data2017,
  2018: data2018,
  2019: data2019,
  2020: data2020,
  2021: data2021,
  2022: data2022,
  2023: data2023,
  2024: data2024,
  2025: data2025,
};

export const years = Object.keys(yearDataByYear)
  .map(Number)
  .toSorted((a, b) => a - b);

export const latestYear = years[years.length - 1];

export const yearThemes: Record<number, string> = {
  2005: "Il dolce della vita",
  2006: "Le mille minestre",
  2007: "Le forme della pasta",
  2008: "Bello da mangiare",
  2009: "Miseria e nobiltà",
  2010: "Salse sughi e condimenti",
  2011: "Sapori d'Italia",
  2012: "Musica in cucina",
  2013: "Bacco in cucina",
  2014: "Orti e cortili",
  2015: "Basta un uovo",
  2016: "Chicchi, grani e farine",
  2017: "Sotto Terra",
  2018: "L'Italia del latte",
  2019: "Il Gusto dei Ricordi",
  2020: "A Casa e Fuori",
  2021: "Amaro",
  2022: "Ripieni",
  2023: "Mediterraneo",
  2024: "Un filo d'olio",
  2025: "Un mondo di spezie",
};

const slugify = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .join("-");
};

const normalizeHtml = (html: string) => {
  return html
    .replace(/<\/?(div|p|br|strong|em)[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const toRestaurant = (restaurantData: RawRestaurant): Restaurant => {
  const {
    address,
    description,
    id,
    mail,
    menus: rawMenus,
    name,
    phone,
    place,
    year,
  } = restaurantData;

  const menus: Menu[] = rawMenus.map((menuData) => {
    const { description, notes, price, title } = menuData;

    return {
      title,
      year,
      price: Number(price),
      description,
      notes: notes ?? null,
    };
  });

  return {
    id,
    name,
    description: description ?? "",
    slug: slugify(name),
    menus,
    maxPrice: menus.reduce((max, menu) => Math.max(max, menu.price), 0),
    address,
    phone: phone ?? null,
    mail: mail ?? null,
    year,
    place,
  };
};

const compareNames = (left: string, right: string) =>
  left.localeCompare(right, "it");

const restaurantsByYear = new Map(
  years.map((year): [number, Restaurant[]] => [
    year,
    yearDataByYear[year]
      .map(toRestaurant)
      .toSorted((left, right) => compareNames(left.name, right.name)),
  ]),
);

export const allRestaurants = years.flatMap(
  (year) => restaurantsByYear.get(year) ?? [],
);

const placesByYear = new Map(
  years.map((year): [number, string[]] => [
    year,
    Array.from(
      new Set((restaurantsByYear.get(year) ?? []).map((restaurant) => restaurant.place)),
    ).toSorted(compareNames),
  ]),
);

const restaurantsBySlug = allRestaurants.reduce<Map<string, Restaurant[]>>(
  (grouped, restaurant) => {
    const { slug } = restaurant;
    const existing = grouped.get(slug) ?? [];
    grouped.set(slug, [...existing, restaurant]);

    return grouped;
  },
  new Map<string, Restaurant[]>(),
);

const sortComparators: Record<SortMode, (left: Restaurant, right: Restaurant) => number> = {
  name: (left, right) => compareNames(left.name, right.name),
  "name-reversed": (left, right) => compareNames(right.name, left.name),
  price: (left, right) => right.maxPrice - left.maxPrice || compareNames(left.name, right.name),
  "price-reversed": (left, right) =>
    left.maxPrice - right.maxPrice || compareNames(left.name, right.name),
};

export const getYearTheme = (year: number) => {
  return yearThemes[year] ?? "Archivio dei menu";
};

export const getRestaurantsForYear = (year: number) => {
  return restaurantsByYear.get(year) ?? [];
};

export const getPlacesForYear = (year: number) => {
  return placesByYear.get(year) ?? [];
};

export const getRestaurantSlugs = () => {
  return [...restaurantsBySlug.keys()];
};

export const getRestaurantPageData = (slug: string): RestaurantPageData | null => {
  const restaurants = restaurantsBySlug.get(slug);

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  const [firstRestaurant, ...otherRestaurants] = restaurants;

  const latest = otherRestaurants.reduce<Restaurant>((current, next) =>
    next.year > current.year ? next : current,
    firstRestaurant,
  );

  const menus = restaurants
    .flatMap((restaurant): MenuWithYear[] => {
      const { menus, year } = restaurant;

      return menus.map((menu): MenuWithYear => ({
        ...menu,
        year,
      }));
    })
    .toSorted((a, b) => b.year - a.year || a.price - b.price);

  const {
    address,
    description,
    mail,
    name,
    phone,
    place,
  } = latest;

  return {
    slug,
    name,
    description,
    address,
    phone,
    mail,
    place,
    menus,
  };
};

export type SortMode = "name" | "name-reversed" | "price" | "price-reversed";

export const formatPrice = (price: number) => {
  return `€ ${price}`;
};

export const stripHtml = (html: string, limit?: number) => {
  const text = normalizeHtml(html);
  if (!limit || text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit - 1).trimEnd()}…`;
};

const includesQuery = (source: string, query: string) => {
  return source.toLowerCase().includes(query);
};

export function filterRestaurants(
  restaurants: Restaurant[],
  options: { query: string; places: string[]; sort: SortMode },
) {
  const { places, query: rawQuery, sort } = options;
  const query = rawQuery.trim().toLowerCase();

  const filtered = restaurants.filter((restaurant) => {
    const { address, description, menus, name, place } = restaurant;

    if (places.length > 0 && !places.includes(place)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      name,
      description,
      address,
      place,
      ...menus.flatMap((menu) => [menu.title ?? "", menu.description]),
    ].join(" ");

    return includesQuery(haystack, query);
  });

  return sortRestaurants(filtered, sort);
}

export const sortRestaurants = (restaurants: Restaurant[], sort: SortMode) => {
  return [...restaurants].toSorted(sortComparators[sort]);
};

export const sortChoices: Array<{ value: SortMode; label: string }> = [
  { value: "name", label: "A - Z" },
  { value: "name-reversed", label: "Z - A" },
  { value: "price", label: "€€€ - €" },
  { value: "price-reversed", label: "€ - €€€" },
];

export const getMapsUrl = (name: string, address: string): string => {
  return `https://www.google.com/maps/search/${encodeURIComponent(
    `${name} ${address}`,
  )}`;
};

export const getPhoneUrl = (phone: string): string => {
  return `tel:${phone.replace(/\s+/g, "")}`;
};

export const groupMenusByYear = (
  menus: MenuWithYear[],
): Array<[number, MenuWithYear[]]> => {
  const groups = menus.reduce<Record<number, MenuWithYear[]>>((acc, menu) => {
    const { year } = menu;
    acc[year] = [...(acc[year] ?? []), menu];
    return acc;
  }, {});

  return Object.entries(groups)
    .map(([year, yearMenus]) => [Number(year), yearMenus] as [number, MenuWithYear[]])
    .toSorted(([leftYear], [rightYear]) => rightYear - leftYear);
};