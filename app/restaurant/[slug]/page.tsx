import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RestaurantCard } from "../../components/RestaurantCard";
import { SiteHeader } from "../../components/SiteHeader";
import {
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

  return (
    <>
      <SiteHeader
        showBackLink
        backHref={backYear ? `/year/${backYear}` : undefined}
      />

      <main className="page-shell stack-lg flex-1">
        <section className="max-w-3xl stack-sm">
          <h1 className="text-foreground text-balance text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
            {name}
          </h1>
        </section>

        <section>
          <div className="text-foreground stack-md">
            {description && (
              <div
                className="text-muted max-w-lg space-y-3 text-base"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            <div className="space-y-3">
              <div>
                <p className="mono-label text-sm">Indirizzo</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`}
                  className="interactive-link mt-1 inline-block"
                >
                  {address}
                </a>
              </div>

              {phone ||
                (mail && (
                  <div>
                    <p className="mono-label text-sm">Contatti</p>
                    <div className="mt-1 flex flex-col gap-1">
                      {phone && (
                        <a
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="interactive-link"
                        >
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
                ))}
            </div>
          </div>
        </section>

        <section className="stack-md">
          <h2 className="text-foreground text-3xl font-bold uppercase tracking-tight">
            Menù per anno
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
