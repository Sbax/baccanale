import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef
} from "@angular/core";
import { Restaurant } from "src/app/interfaces/restaurant";
import { Subscription } from "rxjs";
import { RestaurantService } from "src/app/services/restaurant.service";
import { tileLayer, latLng, marker, Marker, icon } from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, OnDestroy {
  imola = {
    lat: 44.3605216,
    lng: 11.7085437
  };

  options = {
    layers: [
      tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "Map data © OpenStreetMap contributors"
      })
    ],
    zoom: 14,
    center: latLng(this.imola.lat, this.imola.lng)
  };

  layers: Marker[];

  selectedRestaurant: Restaurant;

  @Input()
  restaurants: Restaurant[];

  restaurantsChanged: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.restaurantsChanged.unsubscribe();
  }

  public createPopupComponentWithRestaurant(restaurant: Restaurant) {
    const popupEl = document.createElement("popup-element");
    popupEl.addEventListener("closed", () =>
      document.body.removeChild(popupEl)
    );

    popupEl.innerText = restaurant.name;
    // Add to the DOM
    document.body.appendChild(popupEl);
    return popupEl;
  }

  createMarker(restaurant: Restaurant) {
    return marker([restaurant.location.lat, restaurant.location.lng], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, -10],
        iconUrl: "assets/marker-icon.png",
        shadowUrl: "assets/marker-shadow.png"
      })
    })
      .bindPopup(_ => this.createPopupComponentWithRestaurant(restaurant))
      .on("click", () => {
        this.selectedRestaurant = restaurant;
        // terrible workaround since event handling in leaflet-ngx isn't the best
        this.ref.detectChanges();
      });
  }

  ngOnInit() {
    const restaurants = this.restaurantService.filteredRestaurants;

    this.layers = [...restaurants].map(e => this.createMarker(e));

    if (this.layers.length === 1) {
      this.selectedRestaurant = restaurants[0];
    }

    this.restaurantsChanged = this.restaurantService.filteredRestaurantsChanged.subscribe(
      restaurants => {
        this.layers = [...restaurants].map(e => this.createMarker(e));

        if (restaurants.length === 1) {
          this.selectedRestaurant = restaurants[0];
        }
      }
    );
  }
}
