import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap, faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/map/map.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

library.add(faSearch);

library.add(faPhone);
library.add(faMap);

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    MenuComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
