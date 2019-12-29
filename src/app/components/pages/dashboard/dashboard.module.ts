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
import { ChartModule } from 'angular-highcharts';
// import {ResColumnComponent} from '../../common/res-column.component'
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePickerComponent ,PERSIAN_DATE_FORMATS} from '../../date-picker/date-picker.component';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ColumnChartComponent } from '../../charts/column-chart/column-chart.component';
import { CylinderComponent } from '../../charts/cylinder/cylinder.component';
import { FilterBarComponent } from '../../filter-bar/filter-bar.component';
import { FilterProfileComponent } from '../../filter-profile/filter-profile.component';
import { WidgetsComponent } from '../../common/widgets/widgets.component';
import { Map2Component } from '../../charts/map2/map2.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NewsDetailsComponent } from './news-details/news-details.component';


@NgModule({
  declarations: [DashboardComponent,MapComponent,WordCloudComponent,
    PureComponent,
    RadarComponent,
    SolidComponent,
    SemiCircleComponent,
    RadialLineComponent,
    RadialHistogramComponent,
    ResColumnComponent,
    DatePickerComponent,
    ColumnChartComponent,
    CylinderComponent,
    FilterBarComponent,
    FilterProfileComponent,
    WidgetsComponent,
    Map2Component,
    NewsDetailsComponent,
    ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    DashboardRoutingModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatCheckboxModule,
    AngularFontAwesomeModule,
  ],
  providers:[    { provide: DateAdapter, useClass: DatePickerComponent, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
]
})
export class DashboardModule { }
