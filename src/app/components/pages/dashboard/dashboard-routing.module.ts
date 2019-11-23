import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PureComponent } from '../../charts/pure/pure.component';
import { Map2Component } from '../../charts/map2/map2.component';


const routes: Routes = [{path: '', component: DashboardComponent},
{path: 'map', component: Map2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
