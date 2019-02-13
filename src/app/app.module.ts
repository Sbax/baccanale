import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMap,
  faPhone,
  faSearch,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import { Ng5SliderModule } from "ng5-slider";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeRedirectComponent } from "./components/home-redirect/home-redirect.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { YearSliderComponent } from "./components/year-slider/year-slider.component";

library.add(faSearch);
library.add(faCaretDown);
library.add(faPhone);
library.add(faMap);

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    MenuComponent,
    HomeComponent,
    HomeRedirectComponent,
    YearSliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
