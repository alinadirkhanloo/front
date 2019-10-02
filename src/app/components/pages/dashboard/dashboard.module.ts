import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from '../../charts/map/map.component';
import { WordCloudComponent } from '../../charts/word-cloud/word-cloud.component';
import { PureComponent } from '../../charts/pure/pure.component';
import { RadarComponent } from '../../charts/radar/radar.component';
import { SolidComponent } from '../../charts/solid/solid.component';
import { SemiCircleComponent } from '../../charts/semi-circle/semi-circle.component';
import { RadialHistogramComponent } from '../../charts/radial-histogram/radial-histogram.component';
import { RadialLineComponent } from '../../charts/radial-line/radial-line.component';
import { ResColumnComponent } from '../../common/res-column/res-column.component';
// import {ResColumnComponent} from '../../common/res-column.component'


@NgModule({
  declarations: [DashboardComponent,MapComponent,WordCloudComponent,
    PureComponent,
    RadarComponent,
    SolidComponent,
    SemiCircleComponent,
    RadialLineComponent,
    RadialHistogramComponent,ResColumnComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

  ]
})
export class DashboardModule { }
