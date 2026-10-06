import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { YearExplorer } from "../../components/YearExplorer";
import {
  getCousineTypesForYear,
  getPlacesForYear,
  getRestaurantsForYear,
  getYearTheme,
  latestYear,
  years,
} from "../../lib/baccanale";

export const generateStaticParams = () => {
  return years.map((year) => ({ year: String(year) }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> => {
  const { year } = await params;
  const value = Number(year);
  const resolvedYear = Number.isFinite(value) ? value : latestYear;

  return {
    title: `Baccanale ${resolvedYear}, ${getYearTheme(resolvedYear)}`,
    description: `Menù e ristoranti dell'edizione ${resolvedYear} del Baccanale`,
  };
};

const YearPage = async ({ params }: { params: Promise<{ year: string }> }) => {
  const { year } = await params;
  const yearNumber = Number(year);

  if (!Number.isInteger(yearNumber) || !years.includes(yearNumber)) {
    redirect(`/year/${latestYear}`);
  }

  const restaurants = getRestaurantsForYear(yearNumber);
  const places = getPlacesForYear(yearNumber);
  const cousineTypes = getCousineTypesForYear(yearNumber);

  if (restaurants.length === 0) {
    notFound();
  }

  return (
    <>
      <SiteHeader currentYear={yearNumber} showYearSelector />

      <main id="catalogo" className="flex-1 page-shell stack-lg">
        <section>
          <div className="max-w-3xl stack-sm">
            <h1 className="font-bold text-foreground text-4xl sm:text-5xl lg:text-6xl uppercase text-balance tracking-tight">
              {`Baccanale ${yearNumber}`}
            </h1>
            <h2 className="font-semibold text-4xl text-balance">
              {getYearTheme(yearNumber)}
            </h2>
          </div>
        </section>

        <YearExplorer
          year={yearNumber}
          restaurants={restaurants}
          places={places}
          cousineTypes={cousineTypes}
        />
      </main>
    </>
  );
};

export default YearPage;
