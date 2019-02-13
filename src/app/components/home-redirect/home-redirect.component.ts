import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-redirect",
  templateUrl: "./home-redirect.component.html",
  styleUrls: ["./home-redirect.component.scss"]
})
export class HomeRedirectComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    const year = this.restaurantService.lastYear;
    this.router.navigate(["/year", year]);
  }
}
