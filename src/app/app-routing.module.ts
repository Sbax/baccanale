import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { HomeRedirectComponent } from "./components/home-redirect/home-redirect.component";

const routes: Routes = [
  { path: "", component: HomeRedirectComponent },
  { path: "year", component: HomeRedirectComponent },
  { path: "year/:year", component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
