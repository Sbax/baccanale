"use client";

import { useMemo, useState } from "react";
import {
  filterRestaurants,
  sortChoices,
  type SortMode,
} from "../lib/baccanale";
import type { Restaurant } from "../types";
import { RestaurantCard } from "./RestaurantCard";
import { YearFilters } from "./YearFilters";

type YearExplorerProps = {
  year: number;
  restaurants: Restaurant[];
  places: string[];
};

export const YearExplorer = ({ restaurants, places }: YearExplorerProps) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("name");
  const [activePlaces, setActivePlaces] = useState<string[]>(places);

  const filtered = useMemo(
    () => filterRestaurants(restaurants, { query, places: activePlaces, sort }),
    [activePlaces, query, restaurants, sort],
  );

  const togglePlace = (place: string) => {
    setActivePlaces((current) =>
      current.includes(place)
        ? current.length === 1
          ? places
          : current.filter((value) => value !== place)
        : [...current, place],
    );
  };

  return (
    <section className="stack-lg">
      <YearFilters
        query={query}
        sort={sort}
        places={places}
        activePlaces={activePlaces}
        sortChoices={sortChoices}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onTogglePlace={togglePlace}
      />

      {filtered.length === 0 ? (
        <div className="surface-panel text-muted border-dashed p-10 text-center font-mono text-sm">
          Nessun ristorante corrisponde ai filtri attivi.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
};
