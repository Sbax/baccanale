import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RestaurantCard } from "../../components/RestaurantCard";
import { SiteHeader } from "../../components/SiteHeader";
import {
  getGoogleMapsUrl,
  getOpenStreetMapUrl,
  getPhoneUrl,
  getRestaurantPageData,
  getRestaurantSlugs,
  groupMenusByYear,
  stripHtml,
} from "../../lib/baccanale";

export const generateStaticParams = () => {
  return getRestaurantSlugs().map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const restaurant = getRestaurantPageData(slug);

  if (!restaurant) {
    return {
      title: "Ristorante non trovato",
    };
  }

  const { description, name } = restaurant;

  return {
    title: name,
    description: stripHtml(description, 140) || `Scheda di ${name}`,
  };
};

const RestaurantPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const restaurant = getRestaurantPageData(slug);

  if (!restaurant) {
    notFound();
  }

  const { address, description, mail, menus, name, phone } = restaurant;
  const backYear = menus[0]?.year ?? undefined;
  const menusByYear = groupMenusByYear(menus);
  const mapsUrl = getGoogleMapsUrl(name, address);
  const openStreetMapUrl = getOpenStreetMapUrl(address);
  const phoneUrl = phone ? getPhoneUrl(phone) : null;

  return (
    <>
      <SiteHeader
        showBackLink
        backHref={backYear ? `/year/${backYear}` : undefined}
      />

      <main className="flex-1 page-shell stack-lg">
        <section className="max-w-3xl stack-sm">
          <h1 className="font-bold text-foreground text-4xl sm:text-5xl lg:text-6xl uppercase text-balance">
            {name}
          </h1>
        </section>

        <section>
          <div className="text-foreground stack-md">
            {description && (
              <div
                className="space-y-3 max-w-lg text-muted text-base"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <div className="space-y-3">
              <div>
                <p className="text-sm mono-label">Indirizzo</p>
                <p className="mt-1 text-foreground">{address}</p>
                <span className="flex flex-wrap gap-3 mb-1">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-link"
                  >
                    Google Maps
                  </a>
                  <a
                    href={openStreetMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-link"
                  >
                    OpenStreetMap
                  </a>
                </span>
              </div>

              {(phone || mail) && (
                <div>
                  <p className="text-sm mono-label">Contatti</p>
                  <div className="flex flex-col items-start gap-1 mt-1">
                    {phoneUrl && (
                      <a href={phoneUrl} className="interactive-link">
                        {phone}
                      </a>
                    )}
                    {mail && (
                      <a href={`mailto:${mail}`} className="interactive-link">
                        {mail}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="stack-md">
          <h2 className="font-bold text-foreground text-3xl uppercase tracking-tight">
            Menù per anno
          </h2>
          <div className="gap-4 grid sm:grid-cols-2">
            {menusByYear.map(([year, yearMenus]) => (
              <RestaurantCard
                key={year}
                restaurant={{ ...restaurant, menus: yearMenus }}
                heading={String(year)}
                hideRestaurantName
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default RestaurantPage;
