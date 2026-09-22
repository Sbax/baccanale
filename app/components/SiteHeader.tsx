"use client";

import { useState } from "react";
import Link from "next/link";
import { latestYear, years } from "../lib/baccanale";

type SiteHeaderProps = {
  showBackLink?: boolean;
  backHref?: string;
  currentYear?: number;
  showYearSelector?: boolean;
};

export const SiteHeader = ({
  showBackLink = false,
  backHref,
  currentYear,
  showYearSelector = false,
}: SiteHeaderProps) => {
  const [isYearArchiveOpen, setIsYearArchiveOpen] = useState(false);

  return (
    <header className="page-shell stack-md py-4">
      <h1 className="text-3xl uppercase tracking-tight sm:text-4xl">
        sito non ufficiale, ma che funziona meglio per il
        <br />
        <b>BACCANALE</b>
      </h1>

      <div className="flex items-center justify-between gap-4">
        <div>
          {showBackLink && (
            <Link
              href={backHref || `/year/${latestYear}`}
              className="interactive-link font-bold uppercase"
            >
              Torna ai menu
            </Link>
          )}

          {showYearSelector && currentYear && (
            <div className="stack-lg">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-lg">{currentYear}</span>
                <span
                  className="interactive-link cursor-pointer font-bold uppercase"
                  onClick={() => setIsYearArchiveOpen((open) => !open)}
                >
                  {isYearArchiveOpen
                    ? "Nascondi altre edizioni"
                    : "Mostra altre edizioni"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={isYearArchiveOpen ? "block" : "hidden"}>
        <nav
          id="year-archive-grid"
          className="grid grid-cols-5 gap-2 md:grid-cols-10"
          aria-label="Edizioni Baccanale"
        >
          {years.map((value) => {
            const selected = value === currentYear;
            const isLatest = value === years[years.length - 1];

            return (
              <Link
                key={value}
                href={isLatest ? "/" : `/year/${value}`}
                aria-current={selected ? "page" : undefined}
                className={`chip-button px-4 py-1.5 text-center ${
                  selected ? "chip-button-active" : "chip-button-idle"
                }`}
              >
                {value}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
