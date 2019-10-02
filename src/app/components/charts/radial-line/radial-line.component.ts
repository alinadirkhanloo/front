import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-radial-line',
  templateUrl: './radial-line.component.html',
  styleUrls: ['./radial-line.component.scss']
})
export class RadialLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

/* Create chart instance */
var chart = am4core.create("chartdiv", am4charts.RadarChart);

var data = [];
var value1 = 500;
var value2 = 600;

for(var i = 0; i < 12; i++){
  let date = new Date();
  date.setMonth(i, 1);
  value1 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
  value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
  data.push({date:date, value1:value1, value2:value2})
}

chart.data = data;

/* Create axes */
var categoryAxis = chart.xAxes.push(new am4charts.DateAxis() as any);

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
valueAxis.extraMin = 0.2;
valueAxis.extraMax = 0.2;
valueAxis.tooltip.disabled = true;

/* Create and configure series */
var series1 = chart.series.push(new am4charts.RadarSeries());
series1.dataFields.valueY = "value1";
series1.dataFields.dateX = "date";
series1.strokeWidth = 3;
series1.tooltipText = "{valueY}";
series1.name = "Series 2";
series1.bullets.create(am4charts.CircleBullet);
series1.dataItems.template.locations.dateX = 0.5;

var series2 = chart.series.push(new am4charts.RadarSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.dateX = "date";
series2.strokeWidth = 3;
series2.tooltipText = "{valueY}";
series2.name = "Series 2";
series2.bullets.create(am4charts.CircleBullet);
series2.dataItems.template.locations.dateX = 0.5;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarY = new am4core.Scrollbar();

chart.cursor = new am4charts.RadarCursor();

chart.legend = new am4charts.Legend();
 
  }

}
