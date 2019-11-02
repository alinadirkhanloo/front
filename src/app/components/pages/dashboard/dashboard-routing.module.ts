import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from '../../charts/map/map.component';


const routes: Routes = [{path: '', component: DashboardComponent},
{path: 'map', component: MapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
