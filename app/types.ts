export type Menu = {
  title?: string;
  description: string;
  price: number;
  year?: number;
  notes?: string | null;
};

export type Restaurant = {
  id?: string;
  name: string;
  description: string;
  slug: string;
  menus: Menu[];
  maxPrice: number;
  address: string;
  phone: string | null;
  mail: string | null;
  year: number;
  place: string;
};

export type MenuWithYear = Menu & { year: number };

export type RestaurantPageData = {
  slug: string;
  name: string;
  description: string;
  address: string;
  phone: string | null;
  mail: string | null;
  place: string;
  menus: MenuWithYear[];
};