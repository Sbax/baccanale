import type { SortMode } from "../lib/baccanale";
import { getCousineTypeStyle } from "../lib/cousineTypes";

type SortChoice = {
  value: SortMode;
  label: string;
};

type YearFiltersProps = {
  query: string;
  sort: SortMode;
  places: string[];
  activePlaces: string[];
  cousineTypes: string[];
  activeCousineTypes: string[];
  sortChoices: SortChoice[];
  onQueryChange: (query: string) => void;
  onSortChange: (sort: SortMode) => void;
  onTogglePlace: (place: string) => void;
  onToggleCousineType: (cousineType: string) => void;
};

export const YearFilters = ({
  query,
  sort,
  places,
  activePlaces,
  cousineTypes,
  activeCousineTypes,
  sortChoices,
  onQueryChange,
  onSortChange,
  onTogglePlace,
  onToggleCousineType,
}: YearFiltersProps) => {
  return (
    <div className="stack-md">
      <div className="gap-3 grid lg:grid-cols-5">
        <label className="flex items-center gap-3 lg:col-span-3 px-4 py-3 surface-panel">
          <span className="mono-label">Cerca</span>
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Nome, luogo, ingredienti, note..."
            className="bg-transparent outline-none w-full placeholder:text-muted text-base"
          />
        </label>

        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 lg:col-span-2">
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

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
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
                className="w-4 h-4 accent-accent cursor-pointer"
              />
              <span>{place}</span>
            </label>
          );
        })}
      </div>

      {cousineTypes.length > 0 && (
        <div className="gap-2 grid grid-cols-3">
          {cousineTypes.map((cousineType) => {
            const selected = activeCousineTypes.includes(cousineType);
            const style = getCousineTypeStyle(cousineType);

            return (
              <label
                key={cousineType}
                className={`check-chip ${
                  selected
                    ? `border-2 ${style?.className ?? ""}`
                    : "check-chip-idle"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onToggleCousineType(cousineType)}
                  className={`w-4 h-4 cursor-pointer ${
                    style?.accentClassName ?? "accent-accent"
                  }`}
                />
                <span className="hidden sm:block uppercase">
                  {style?.label ?? cousineType}
                </span>
                <span className="sm:hidden uppercase">
                  {style?.badgeLabel ?? cousineType}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
