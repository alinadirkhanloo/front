import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapComponent } from './components/charts/map/map.component';
import { WordCloudComponent } from './components/charts/word-cloud/word-cloud.component';
import { PureComponent } from './components/charts/pure/pure.component';
import { RadarComponent } from './components/charts/radar/radar.component';
import { SolidComponent } from './components/charts/solid/solid.component';
import { SemiCircleComponent } from './components/charts/semi-circle/semi-circle.component';
import { RadialLineComponent } from './components/charts/radial-line/radial-line.component';
import { RadialHistogramComponent } from './components/charts/radial-histogram/radial-histogram.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WordCloudComponent,
    PureComponent,
    RadarComponent,
    SolidComponent,
    SemiCircleComponent,
    RadialLineComponent,
    RadialHistogramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
