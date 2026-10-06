import type { Menu } from "../types";

export type CousineType = NonNullable<Menu["cousineType"]>[number];

type CousineTypeStyle = {
  className: string;
  accentClassName: string;
  badgeLabel: string;
  label: string;
};

export const cousineTypeStyles: Record<CousineType, CousineTypeStyle> = {
  carne: {
    className: "border-orange-600 bg-orange-100 text-orange-700",
    accentClassName: "accent-orange-600",
    badgeLabel: "carne",
    label: "Carne",
  },
  pesce: {
    className: "border-sky-600 bg-sky-100 text-sky-700",
    accentClassName: "accent-sky-600",
    badgeLabel: "pesce",
    label: "Pesce",
  },
  "vegetariana/vegana": {
    className: "border-green-600 bg-green-100 text-green-700",
    accentClassName: "accent-green-600",
    badgeLabel: "veg",
    label: "Vegetariana o Vegana",
  },
};

export const getCousineTypeStyle = (
  type: string,
): CousineTypeStyle | undefined => cousineTypeStyles[type as CousineType];
