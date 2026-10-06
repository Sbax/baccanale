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
  cousineTypes: string[];
};

export const YearExplorer = ({
  restaurants,
  places,
  cousineTypes,
}: YearExplorerProps) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("name");
  const [activePlaces, setActivePlaces] = useState<string[]>(places);
  const [activeCousineTypes, setActiveCousineTypes] =
    useState<string[]>(cousineTypes);

  const filtered = useMemo(
    () =>
      filterRestaurants(restaurants, {
        query,
        places: activePlaces,
        cousineTypes: activeCousineTypes,
        sort,
      }),
    [activeCousineTypes, activePlaces, query, restaurants, sort],
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

  const toggleCousineType = (cousineType: string) => {
    setActiveCousineTypes((current) =>
      current.includes(cousineType)
        ? current.length === 1
          ? cousineTypes
          : current.filter((value) => value !== cousineType)
        : [...current, cousineType],
    );
  };

  return (
    <section className="stack-lg">
      <YearFilters
        query={query}
        sort={sort}
        places={places}
        activePlaces={activePlaces}
        cousineTypes={cousineTypes}
        activeCousineTypes={activeCousineTypes}
        sortChoices={sortChoices}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onTogglePlace={togglePlace}
        onToggleCousineType={toggleCousineType}
      />

      {filtered.length === 0 ? (
        <div className="p-10 border-dashed font-mono text-muted text-sm text-center surface-panel">
          Nessun ristorante corrisponde ai filtri attivi.
        </div>
      ) : (
        <div className="gap-4 grid md:grid-cols-2">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
};
