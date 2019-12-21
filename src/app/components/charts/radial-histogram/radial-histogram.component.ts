import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from '@amcharts/amcharts4/themes/material'

@Component({
  selector: 'app-radial-histogram',
  templateUrl: './radial-histogram.component.html',
  styleUrls: ['./radial-histogram.component.scss']
})
export class RadialHistogramComponent implements OnInit {

  constructor() { }

  ngOnInit() {


// Themes begin
am4core.useTheme(am4themes_animated);

am4core.useTheme(am4themes_material);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv8", am4charts.RadarChart);
// chart.scrollbarX = new am4core.Scrollbar();

var data = [];

for(var i = 0; i < 20; i++){
  data.push({category: i, value:Math.round(Math.random() * 100)});
}

chart.data = data;
chart.radius = am4core.percent(100);
chart.innerRadius = am4core.percent(50);

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;
categoryAxis.renderer.grid.template.disabled = true;
//categoryAxis.renderer.labels.template.disabled = true;
let labelTemplate = categoryAxis.renderer.labels.template;
labelTemplate.radius = am4core.percent(-60);
labelTemplate.location = 0.5;
labelTemplate.relativeRotation = 90;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
valueAxis.renderer.grid.template.disabled = true;
valueAxis.renderer.labels.template.disabled = true;
valueAxis.tooltip.disabled = true;

// Create series
var series = chart.series.push(new am4charts.RadarColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "value";
series.dataFields.categoryX = "category";
series.columns.template.strokeWidth = 0;
series.tooltipText = "{valueY}";
series.columns.template.radarColumn.cornerRadius = 10;
series.columns.template.radarColumn.innerCornerRadius = 0;

series.tooltip.pointerOrientation = "vertical";

// on hover, make corner radiuses bigger
let hoverState = series.columns.template.radarColumn.states.create("hover");
hoverState.properties.cornerRadius = 0;
hoverState.properties.fillOpacity = 1;


series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
})

// Cursor
chart.cursor = new am4charts.RadarCursor();
chart.cursor.innerRadius = am4core.percent(50);
chart.cursor.lineY.disabled = true;
  }

}
