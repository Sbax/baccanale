import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RestaurantService } from "src/app/services/restaurant.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit, OnDestroy {
  expanded = false;

  years: number[];
  places: string[];

  year: number;
  yearSubscription: Subscription;

  activePlaces: string[] = [];

  themes = {
    2005: "Il dolce della vita",
    2006: "Le mille minestre",
    2007: "Le forme della pasta",
    2008: "Bello da mangiare",
    2009: "Miseria e nobiltà",
    2010: "Salse sughi e condimenti",
    2011: "Sapori d'Italia",
    2012: "Musica in cucina",
    2013: "Bacco in cucina",
    2014: "Orti e cortili",
    2015: "Basta un uovo",
    2016: "Chicchi, grani e farine",
    2017: "Sotto Terra",
    2018: "L'Italia del latte",
    2019: "Il Gusto dei Ricordi",
    2020: "A Casa e Fuori",
  };

  private _filter: string;
  set filter(filter) {
    this._filter = filter;
    this.filterList(filter);
  }

  get filter() {
    return this._filter;
  }

  constructor(
    private restaurantService: RestaurantService,
    route: ActivatedRoute,
    router: Router
  ) {
    route.params.subscribe(params => {
      const { year } = params;

      if (year) {
        if (this.restaurantService.years.includes(parseInt(year)))
          restaurantService.applyFilterForYear(parseInt(year));
        else
          router.navigate(["/year", this.restaurantService.lastYear], {
            replaceUrl: true
          });
      }
    });

    const { years, places } = this.restaurantService;
    this.years = years;
    this.places = places;
    this.activePlaces = this.places;

    this.year = restaurantService.currentYear;

    this.sort();
  }

  ngOnInit() {
    this.yearSubscription = this.restaurantService.currentYearChanged.subscribe(
      year => {
        this.year = year;
      }
    );
  }

  ngOnDestroy() {
    if (this.yearSubscription) this.yearSubscription.unsubscribe();
  }

  classIsActive(place: string) {
    return this.activePlaces.includes(place);
  }

  includePlace(place: string) {
    if (this.classIsActive(place)) {
      this.activePlaces = this.activePlaces.filter(e => e !== place);
    } else {
      this.activePlaces = [place, ...this.activePlaces];
    }

    return this.filterActivePlaces();
  }

  filterActivePlaces() {
    this.restaurantService.applyFilterForPlaces(this.activePlaces);
  }

  filterList(filter: string) {
    this.restaurantService.applyFilterForString(filter);
  }

  sort() {
    this.restaurantService.updateSort("name");
  }

  reverse() {
    this.restaurantService.updateSort("name-reversed");
  }

  cheaperFirst() {
    this.restaurantService.updateSort("price-reversed");
  }

  cheaperLast() {
    this.restaurantService.updateSort("price");
  }
}
