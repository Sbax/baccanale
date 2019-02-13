import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { HomeRedirectComponent } from "./components/home-redirect/home-redirect.component";
import { RestaurantPageComponent } from "./components/restaurant-page/restaurant-page.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";

const routes: Routes = [
  {
    path: "year/:year",
    component: MainPageComponent,
    children: [{ path: "", component: HomeComponent, outlet: "inner" }]
  },
  { path: "restaurant/:restaurant", component: RestaurantPageComponent },
  { path: "**", component: HomeRedirectComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
