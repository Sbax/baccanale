import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Menu } from "src/app/interfaces/menu";
import { RestaurantService } from "src/app/services/restaurant.service";
import { Restaurant } from "src/app/interfaces/restaurant";

@Component({
  selector: "app-restaurant-page",
  templateUrl: "./restaurant-page.component.html",
  styleUrls: ["./restaurant-page.component.scss"]
})
export class RestaurantPageComponent {
  menus: Menu[] = [];
  description: string;
  name: string;
  address: string;
  addressUrl: string;
  phone: string;

  constructor(restaurantService: RestaurantService, route: ActivatedRoute) {
    route.params.subscribe(({ restaurant }) => {
      const restaurants: Restaurant[] = [
        ...restaurantService.restaurants
      ].filter(e => e.slug === restaurant);

      this.menus = restaurants
        .reduce((a, e) => {
          a.push(...e.menus);
          return a;
        }, [])
        .sort((a, b) => {
          if (a.year < b.year) return 1;
          if (a.year > b.year) return -1;
          return 0;
        });

      const lastYear = restaurants.reduce((max, e) => {
        if (e.year > max) return e.year;
        return max;
      }, 0);

      const infoForRestaurant = restaurants.find(e => e.year === lastYear);

      this.description = infoForRestaurant.description;
      this.name = infoForRestaurant.name;
      this.address = infoForRestaurant.address;
      this.addressUrl = `${this.name.split(" ").join("+")}+${this.address
        .split(" ")
        .join("+")}`;

      this.phone = infoForRestaurant.phone;
    });
  }
}
