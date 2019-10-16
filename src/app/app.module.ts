import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Ng5SliderModule } from "ng5-slider";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeRedirectComponent } from "./components/home-redirect/home-redirect.component";
import { HomeComponent } from "./components/home/home.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RestaurantPageComponent } from "./components/restaurant-page/restaurant-page.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { YearSliderComponent } from "./components/year-slider/year-slider.component";
import { AboutPageComponent } from './components/about-page/about-page.component';

library.add(faSearch);
library.add(faCaretDown);

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
    AboutPageComponent
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
