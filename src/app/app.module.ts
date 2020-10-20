import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { faCaretDown, fas, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Ng5SliderModule } from "ng5-slider";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { HomeRedirectComponent } from "./components/home-redirect/home-redirect.component";
import { HomeComponent } from "./components/home/home.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RestaurantPageComponent } from "./components/restaurant-page/restaurant-page.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { YearSliderComponent } from "./components/year-slider/year-slider.component";

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    MenuComponent,
    HomeComponent,
    HomeRedirectComponent,
    YearSliderComponent,
    RestaurantPageComponent,
    MainPageComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    Ng5SliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCaretDown);
    library.addIcons(faSearch);
  }
}
