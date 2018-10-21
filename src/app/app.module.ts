import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPhone, faMap } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

library.add(faPhone);
library.add(faMap);

@NgModule({
  declarations: [AppComponent, RestaurantComponent, MenuComponent],
  imports: [BrowserModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
