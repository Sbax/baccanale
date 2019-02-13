import { Component, OnInit, OnDestroy } from "@angular/core";
import { Options } from "ng5-slider";
import { RestaurantService } from "src/app/services/restaurant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-year-slider",
  templateUrl: "./year-slider.component.html",
  styleUrls: ["./year-slider.component.scss"]
})
export class YearSliderComponent implements OnInit, OnDestroy {
  value: number;
  options: Options = {
    showTicks: true,
    showTicksValues: false
  };
  yearSubscription: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    const { lastYear, years } = restaurantService;

    this.options.floor = years[0];
    this.options.ceil = lastYear;

    this.value = restaurantService.currentYear;
  }

  ngOnInit() {
    this.yearSubscription = this.restaurantService.currentYearChanged.subscribe(
      year => {
        this.value = year;
      }
    );
  }

  ngOnDestroy() {
    if (this.yearSubscription) this.yearSubscription.unsubscribe();
  }

  valueChange(year: number) {
    this.router.navigateByUrl(`year/${year}`);
  }
}
