import { Menu } from "./menu";

export interface Restaurant {
  name: string;
  menus: Menu[];
  maxPrice: number;
  address: string;
  phone: string;
  location?: any;
}
