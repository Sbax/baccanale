import Link from "next/link";
import { formatPrice, getMapsUrl, getPhoneUrl } from "../lib/baccanale";
import type { Menu, MenuWithYear, Restaurant } from "../types";

type RestaurantCardData = Pick<
  Restaurant,
  "name" | "slug" | "address" | "phone"
> & {
  menus: Array<Menu | MenuWithYear>;
};

type RestaurantCardProps = {
  restaurant: RestaurantCardData;
  showYear?: boolean;
  hideRestaurantName?: boolean;
  heading?: string;
};

const getMenuKey = (menu: Menu | MenuWithYear) => {
  const { description, price, title, year } = menu;

  return `${year ?? "menu"}-${title ?? price}-${description.slice(0, 24)}`;
};

export const RestaurantCard = ({
  restaurant,
  showYear = false,
  hideRestaurantName = false,
  heading,
}: RestaurantCardProps) => {
  const { address, menus, name, phone, slug } = restaurant;
  const mapsUrl = getMapsUrl(name, address);
  const phoneUrl = phone ? getPhoneUrl(phone) : null;
  const showRestaurantMeta = !hideRestaurantName;

  return (
    <article className="surface-panel flex h-full flex-col p-4">
      {heading && <p className="mono-label">{heading}</p>}

      {showRestaurantMeta && (
        <div className="flex items-start justify-between gap-4">
          <Link href={`/restaurant/${slug}`} className="group">
            <h2 className="text-2xl font-bold uppercase text-foreground decoration-2 underline group-hover:bg-accent-strong group-hover:text-background">
              {name}
            </h2>
          </Link>
        </div>
      )}

      <div
        className={`${showRestaurantMeta || heading ? "mt-4 " : ""}stack-md`}
      >
        {menus.map((menu, index) => {
          const { description, notes, price, title, year } = menu;

          return (
            <div
              key={getMenuKey(menu)}
              className={index > 0 ? "border-border border-t pt-4" : undefined}
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div className="stack-xs">
                  {showYear && year && <p className="mono-label">{year}</p>}
                  {title && <p className="text-muted text-sm">{title}</p>}
                </div>

                <p className="text-muted font-mono text-sm uppercase whitespace-nowrap">
                  {formatPrice(price)}
                </p>
              </div>
              <div
                className="text-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {notes && (
                <div
                  className="text-muted mt-2 italic"
                  dangerouslySetInnerHTML={{ __html: notes }}
                />
              )}
            </div>
          );
        })}
      </div>

      {showRestaurantMeta && (
        <div className="mt-auto flex flex-col items-start gap-2 pt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-link text-sm font-semibold"
          >
            {address}
          </a>
          {phoneUrl && (
            <a
              href={phoneUrl}
              className="interactive-link text-sm font-semibold"
            >
              {phone}
            </a>
          )}
        </div>
      )}
    </article>
  );
};
