import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
