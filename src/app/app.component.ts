import { Component } from "@angular/core";
import { Restaurant } from "./interfaces/restaurant";
import { RestaurantService } from "./services/restaurant.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];

  private _filter: string;
  set filter(filter) {
    this._filter = filter;
    this.filterList(filter);
  }

  get filter() {
    return this._filter;
  }

  constructor(private restaurantService: RestaurantService) {
    this.restaurants = restaurantService.restaurants;

    this.sort();
  }

  filterList(_filter) {
    if (!_filter) {
      this.restaurantService.filteredRestaurants = this.restaurants;
      return;
    }

    const filter = _filter.toLowerCase();

    this.restaurantService.filteredRestaurants = this.restaurants.filter(e => {
      const nameIncludesFilter = e.name.toLowerCase().includes(filter);

      const menusIncludeFilter = e.menus.filter(menu => {
        return (
          menu.name.toLowerCase().includes(filter) ||
          menu.extended.toLowerCase().includes(filter)
        );
      });

      return nameIncludesFilter || menusIncludeFilter.length;
    });
  }

  sort() {
    this.restaurantService.filteredRestaurants = this.restaurantService.filteredRestaurants.sort(
      (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
    );
  }

  reverse() {
    this.restaurantService.filteredRestaurants = this.restaurantService.filteredRestaurants.sort(
      (a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      }
    );
  }

  cheaperFirst() {
    this.restaurantService.filteredRestaurants = this.restaurantService.filteredRestaurants.sort(
      (a, b) => {
        if (a.maxPrice < b.maxPrice) return -1;
        if (a.maxPrice > b.maxPrice) return 1;
        return 0;
      }
    );
  }

  cheaperLast() {
    this.restaurantService.filteredRestaurants = this.restaurantService.filteredRestaurants.sort(
      (a, b) => {
        if (a.maxPrice < b.maxPrice) return 1;
        if (a.maxPrice > b.maxPrice) return -1;
        return 0;
      }
    );
  }
}
