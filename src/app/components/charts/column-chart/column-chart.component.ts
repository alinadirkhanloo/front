import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {
 
  private recived_data=[]
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.preProc(this.recived_data)) }, 1000)
  }

loadChart(data) {

 // Themes begin
 am4core.useTheme(am4themes_animated);
 // Themes end
 
 // Create chart instance
 var chart = am4core.create("chartdiv9", am4charts.XYChart);
 
 // Add data
 chart.data = data.reverse()
 
 // Create axes
 var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
 yAxis.dataFields.category = "text";
 yAxis.renderer.grid.template.location = 0;
 yAxis.renderer.labels.template.fontSize = 16;
 yAxis.renderer.minGridDistance = 10;
 
 var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
 
 // Create series
 var series = chart.series.push(new am4charts.ColumnSeries());
 series.dataFields.valueX = "weight";
 series.dataFields.categoryY = "text";
 series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
 series.columns.template.strokeWidth = 0;
 

 
 // Add ranges
 function addRange(label, start, end, color) {
   var range = yAxis.axisRanges.create();
   range.category = start;
   range.endCategory = end;
   range.label.text = label;
   range.label.disabled = false;
   range.label.fill = color;
   range.label.location = 0;
   range.label.dx = -130;
   range.label.dy = 12;
   range.label.fontWeight = "bold";
   range.label.fontSize = 12;
   range.label.horizontalCenter = "left"
   range.label.inside = true;
   
   range.grid.stroke = am4core.color("#396478");
   range.grid.strokeOpacity = 1;
   range.tick.length = 200;
   range.tick.disabled = false;
   range.tick.strokeOpacity = 0.6;
   range.tick.stroke = am4core.color("#396478");
   range.tick.location = 0;
   
   range.locations.category = 1;
 }
 
 chart.cursor = new am4charts.XYCursor();

  }

  load_data(){
    this.apiService.getTopPlatforms().subscribe(data => {
      this.recived_data=data['body'];
    });
  }
  
  preProc(data){
    let temp=data
    // for(var item in data){
    //   temp.push({
    //       name: data[item].text,
    //       value: data[item].weight,
    //   })
    // }
    return temp
  }

}
