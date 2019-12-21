import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ApiService } from 'src/app/services/api.service';
import am4themes_material from '@amcharts/amcharts4/themes/material'
@Component({
  selector: 'app-solid',
  templateUrl: './solid.component.html',
  styleUrls: ['./solid.component.scss']
})
export class SolidComponent implements OnInit {

  private recived_data=[]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.preProc(this.recived_data)) }, 4000)
  }

  loadChart(data){

    // Themes begin
    am4core.useTheme(am4themes_animated);

    am4core.useTheme(am4themes_material);
    // Themes end



    // Create chart instance
    var chart = am4core.create("chartdiv5", am4charts.RadarChart);

    // Add data
    chart.data = data
    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
      return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();

  }

  load_data(){
    this.apiService.getSentiment().subscribe(data => {
      this.recived_data=data['body'];
    });
  }
  
  preProc(data){
    let temp=[]
    for(var item in data){
      temp.push({
          category: data[item].name,
          value: (data[item].y/299)*100,
          full: 100
      } )
    }
    return temp
  }

}
