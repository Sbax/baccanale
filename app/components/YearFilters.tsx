import type { SortMode } from "../lib/baccanale";

type SortChoice = {
  value: SortMode;
  label: string;
};

type YearFiltersProps = {
  query: string;
  sort: SortMode;
  places: string[];
  activePlaces: string[];
  sortChoices: SortChoice[];
  onQueryChange: (query: string) => void;
  onSortChange: (sort: SortMode) => void;
  onTogglePlace: (place: string) => void;
};

export const YearFilters = ({
  query,
  sort,
  places,
  activePlaces,
  sortChoices,
  onQueryChange,
  onSortChange,
  onTogglePlace,
}: YearFiltersProps) => {
  return (
    <div className="stack-md">
      <div className="grid gap-3 lg:grid-cols-5">
        <label className="surface-panel flex items-center gap-3 px-4 py-3 lg:col-span-3">
          <span className="mono-label">Cerca</span>
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Nome, luogo, ingredienti, note..."
            className="w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
        </label>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:col-span-2 lg:grid-cols-2 xl:grid-cols-4">
          {sortChoices.map((choice) => {
            const selected = sort === choice.value;

            return (
              <button
                key={choice.value}
                type="button"
                onClick={() => onSortChange(choice.value)}
                className={`chip-button ${
                  selected ? "chip-button-active" : "chip-button-idle"
                }`}
              >
                {choice.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {places.map((place) => {
          const selected = activePlaces.includes(place);

          return (
            <label
              key={place}
              className={`check-chip ${
                selected ? "check-chip-active" : "check-chip-idle"
              }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onTogglePlace(place)}
                className="h-4 w-4 cursor-pointer accent-accent"
              />
              <span>{place}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
