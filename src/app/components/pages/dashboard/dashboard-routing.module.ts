import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from '../../charts/map/map.component';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { ResColumnComponent } from '../../common/res-column/res-column.component';
import { FilterBarComponent } from '../../filter-bar/filter-bar.component';


const routes: Routes = [{path: '', component: DashboardComponent},
{path: 'map', component: FilterBarComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
