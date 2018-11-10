import { Injectable } from "@angular/core";
import restaurantsData from "./restaurants.json";
import { Restaurant } from "../interfaces/restaurant.js";
import { Menu } from "../interfaces/menu.js";
import { Subject } from "rxjs";

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

  constructor() {
    this.restaurants = restaurantsData.map((restaurantData, i) => {
      const menus: Menu[] = restaurantData.menus.map(menuData => {
        const menu: Menu = {
          name: menuData.name,
          price: parseFloat(menuData.price),
          extended: menuData.extended
        };

        return menu;
      });

      const restaurant: Restaurant = {
        name: restaurantData.name,
        menus: menus,
        maxPrice: Math.max(...menus.map(e => e.price)),
        address: restaurantData.address,
        location: restaurantData.location,
        phone: restaurantData.phone
      };

      return restaurant;
    });

    this.filteredRestaurants = this.restaurants;
  }
}
