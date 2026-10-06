import Link from "next/link";
import { formatPrice, getMapsUrl, getPhoneUrl } from "../lib/baccanale";
import { cousineTypeStyles } from "../lib/cousineTypes";
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
    <article className="flex flex-col p-4 h-full surface-panel">
      {heading && <p className="mono-label">{heading}</p>}

      {showRestaurantMeta && (
        <div className="flex justify-between items-start gap-4">
          <Link href={`/restaurant/${slug}`} className="group">
            <h2 className="font-bold text-foreground group-hover:text-background text-2xl decoration-2 underline uppercase group-hover:bg-accent-strong">
              {name}
            </h2>
          </Link>
        </div>
      )}

      <div
        className={`${showRestaurantMeta || heading ? "mt-4 " : ""}stack-md`}
      >
        {menus.map((menu, index) => {
          const { cousineType, description, notes, price, title, year } = menu;

          return (
            <div
              key={getMenuKey(menu)}
              className={index > 0 ? "border-border border-t pt-4" : undefined}
            >
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div className="stack-xs">
                  {showYear && year && <p className="mono-label">{year}</p>}
                  {title && <p className="text-muted text-sm">{title}</p>}
                  {cousineType && cousineType.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {cousineType.map((type) => (
                        <span
                          key={type}
                          className={`border px-1 text-xs uppercase ${cousineTypeStyles[type].className}`}
                        >
                          {cousineTypeStyles[type].badgeLabel}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="font-mono text-muted text-sm uppercase whitespace-nowrap">
                  {formatPrice(price)}
                </p>
              </div>
              <div
                className="text-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {notes && (
                <div
                  className="mt-2 text-muted italic"
                  dangerouslySetInnerHTML={{ __html: notes }}
                />
              )}
            </div>
          );
        })}
      </div>

      {showRestaurantMeta && (
        <div className="flex flex-col items-start gap-2 mt-auto pt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm interactive-link"
          >
            {address}
          </a>
          {phoneUrl && (
            <a
              href={phoneUrl}
              className="font-semibold text-sm interactive-link"
            >
              {phone}
            </a>
          )}
        </div>
      )}
    </article>
  );
};
