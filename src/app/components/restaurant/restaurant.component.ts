import { Component, OnInit, Input } from "@angular/core";
import { Restaurant } from "src/app/interfaces/restaurant";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent implements OnInit {
  addressUrl: string;

  private _restaurant: Restaurant;
  @Input()
  set restaurant(restaurant) {
    this._restaurant = restaurant;

    this.addressUrl = `${restaurant.name
      .split(" ")
      .join("+")}+${restaurant.address.split(" ").join("+")}`;
  }

  get restaurant() {
    return this._restaurant;
  }

  constructor() {}

  ngOnInit() {}
}
