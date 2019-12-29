import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from '@amcharts/amcharts4/themes/spiritedaway'

@Component({
  selector: 'app-cylinder',
  templateUrl: './cylinder.component.html',
  styleUrls: ['./cylinder.component.scss'],
  inputs:[`startdate`,`enddate`]
})
export class CylinderComponent implements OnInit {
 recived_data=[]

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.load_data();
    setTimeout(()=>{ 
        this.loadChart(this.recived_data);
    }, 500)
  }

  ngOnChanges(changes: SimpleChanges){ 
    if(changes['startdate'].firstChange==false){
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.recived_data)}, 500)  
    }
  }

  loadChart(data){

    // Themes begin
    am4core.useTheme(am4themes_animated);

    // am4core.useTheme(am4themes_material);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv10", am4charts.XYChart3D);
    chart.paddingBottom = 30;
    chart.angle = 35;

    // Add data
    chart.data =data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "text";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = "left";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;

    // Create series
    var series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueY = "weight";
    series.dataFields.categoryX = "text";

    var columnTemplate = series.columns.template;
    columnTemplate.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })

    columnTemplate.adapter.add("stroke", function(stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })
  }


  load_data(){
    this.apiService.getTopCategory().subscribe(data => {
      for (let index = 0; index <5; index++) {
        this.recived_data.push(data['body'][index]);
      }
    });
  }

  loadCatData(temp){
    var d=[]
    for (let i = 0; i <5; i++) {
          d.push({
            text:temp[i].value ,
            weight:temp[i].customData
          })  
    }
    return d
  }

}