import { Injectable } from "@angular/core";
import { Restaurant } from "../interfaces/restaurant.js";
import { Menu } from "../interfaces/menu.js";
import { Subject } from "rxjs";

// I should use dynamic imports, but this is much more convenient
import data2005 from "./data/data-2005.json";
import data2006 from "./data/data-2006.json";
import data2007 from "./data/data-2007.json";
import data2008 from "./data/data-2008.json";
import data2009 from "./data/data-2009.json";
import data2010 from "./data/data-2010.json";
import data2011 from "./data/data-2011.json";
import data2012 from "./data/data-2012.json";
import data2013 from "./data/data-2013.json";
import data2014 from "./data/data-2014.json";
import data2015 from "./data/data-2015.json";
import data2016 from "./data/data-2016.json";
import data2017 from "./data/data-2017.json";
import data2018 from "./data/data-2018.json";
import data2019 from "./data/data-2019.json";

interface Filter {
  string: string;
  places: string[];
  year: number;
}

type SortOption = "name" | "name-reversed" | "price" | "price-reversed";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  restaurants: Restaurant[];

  filteredRestaurantsChanged: Subject<Restaurant[]> = new Subject<
    Restaurant[]
  >();

  _filteredRestaurants: Restaurant[] = [];

  get filteredRestaurants() {
    return this._filteredRestaurants;
  }

  set filteredRestaurants(restaurants: Restaurant[]) {
    this._filteredRestaurants = [...restaurants];

    this.filteredRestaurantsChanged.next(this._filteredRestaurants);
  }

  lastYear: number = 0;
  years: number[];
  places: string[];

  filterBy: Filter = {
    string: "",
    places: [],
    year: 0
  };

  currentYearChanged: Subject<number> = new Subject<number>();
  private _currentYear: number = 0;
  get currentYear() {
    return this._currentYear;
  }

  set currentYear(year) {
    this._currentYear = year;

    this.currentYearChanged.next(year);
  }

  sort: SortOption = "name";
  sortyBy = {
    ["name"](restaurants: Restaurant[]) {
      return restaurants.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    ["name-reversed"](restaurants: Restaurant[]) {
      return restaurants.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    },
    ["price"](restaurants: Restaurant[]) {
      return restaurants.sort((a, b) => {
        if (a.maxPrice < b.maxPrice) return 1;
        if (a.maxPrice > b.maxPrice) return -1;
        return 0;
      });
    },
    ["price-reversed"](restaurants: Restaurant[]) {
      return restaurants.sort((a, b) => {
        if (a.maxPrice < b.maxPrice) return -1;
        if (a.maxPrice > b.maxPrice) return 1;
        return 0;
      });
    }
  };

  constructor() {
    this.initData();
  }

  initData() {
    const dataYears = [
      data2005,
      data2006,
      data2007,
      data2008,
      data2009,
      data2010,
      data2011,
      data2012,
      data2013,
      data2014,
      data2015,
      data2016,
      data2017,
      data2018,
      data2019
    ];

    const restaurantsData = [].concat(...dataYears);

    const years = new Set();
    const places = new Set();

    this.restaurants = restaurantsData.map((restaurantData, i) => {
      const menus: Menu[] = restaurantData.menus.map(menuData => {
        const menu: Menu = {
          year: restaurantData.year,
          price: parseFloat(menuData.price),
          description: menuData.description
        };

        return menu;
      });

      const { name, address, phone, year, place, description } = restaurantData;
      const slug = name
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, "")
        .split(" ")
        .join("-");

      const restaurant: Restaurant = {
        name,
        description,
        slug,
        menus: menus,
        maxPrice: Math.max(...menus.map(e => e.price)),
        address,
        phone,
        year,
        place
      };

      years.add(restaurantData.year);
      places.add(restaurantData.place);

      return restaurant;
    });

    this.years = Array.from(years, (year: number) => year);
    this.places = Array.from(places, (place: string) => place);

    const lastYear = this.years[this.years.length - 1];
    this.lastYear = lastYear;

    this.applyFilterForYear(lastYear);
  }

  applyFilterForYear(year: number) {
    this.filterBy.year = year;
    this.currentYear = year;

    this.applyFilter();
  }

  applyFilterForString(string: string) {
    this.filterBy.string = string.toLowerCase();

    this.applyFilter();
  }

  applyFilterForPlaces(places: string[]) {
    this.filterBy.places = [...places];

    this.applyFilter();
  }

  applyFilter() {
    const newFilter = this.restaurants.filter((restaurant: Restaurant) => {
      const yearIncluded =
        this.filterBy.year && restaurant.year === this.filterBy.year;
      if (!yearIncluded) return;

      const placeIncluded = this.filterBy.places.length
        ? this.filterBy.places.includes(restaurant.place)
        : true;
      if (!placeIncluded) return;

      if (this.filterBy.string) {
        const textInRestaurant = [
          restaurant.name.toLowerCase(),
          ...restaurant.menus.map(e => e.description.toLowerCase())
        ];
        const stringIncluded = textInRestaurant.reduce((a, e) => {
          return a || e.includes(this.filterBy.string);
        }, false);

        if (!stringIncluded) return;
      }

      return true;
    });

    this.filteredRestaurants = this.applySort(newFilter);
  }

  updateSort(sort: SortOption) {
    this.sort = sort;

    this.filteredRestaurants = this.applySort(this.filteredRestaurants);
  }

  applySort(restaurants: Restaurant[]) {
    const sorted = this.sortyBy[this.sort](restaurants);

    return sorted;
  }
}
