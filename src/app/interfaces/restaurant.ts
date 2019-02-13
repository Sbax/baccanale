import { Menu } from "./menu";

export interface Restaurant {
  name: string;
  description: string;
  slug: string;
  menus: Menu[];
  maxPrice: number;
  address: string;
  phone: string;
  year: number;
  place: string;
}
