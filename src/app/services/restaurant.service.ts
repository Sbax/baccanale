import { Injectable } from "@angular/core";
import restaurantsData from "./restaurants.json";
import { Restaurant } from "../interfaces/restaurant.js";
import { Menu } from "../interfaces/menu.js";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  restaurants: Restaurant[];

  constructor() {
    this.restaurants = restaurantsData.map(restaurantData => {
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
        phone: restaurantData.phone
      };

      return restaurant;
    });
  }
}
