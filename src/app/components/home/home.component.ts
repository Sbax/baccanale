import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Restaurant } from "../../interfaces/restaurant";
import { RestaurantService } from "../../services/restaurant.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input()
  restaurants: Restaurant[];

  restaurantsChanged: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      const { year } = params;

      this.restaurantService.applyFilterForYear(parseInt(year));
    });
  }

  ngOnDestroy() {
    this.restaurantsChanged.unsubscribe();
  }

  ngOnInit() {
    this.restaurants = [...this.restaurantService.filteredRestaurants];

    this.restaurantsChanged = this.restaurantService.filteredRestaurantsChanged.subscribe(
      restaurants => {
        this.restaurants = [...restaurants];
      }
    );
  }
}
