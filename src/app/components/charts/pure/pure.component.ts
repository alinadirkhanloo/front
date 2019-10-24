import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pure',
  templateUrl: './pure.component.html',
  styleUrls: ['./pure.component.scss']
})
export class PureComponent implements OnInit {

  private recived_data=[]
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.recived_data) }, 1000)
  }

loadChart(data){
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end



var chart = am4core.create("chartdiv3", am4plugins_forceDirected.ForceDirectedTree);
chart.legend = new am4charts.Legend();

var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

networkSeries.data = data

networkSeries.dataFields.linkWith = "linkWith";
networkSeries.dataFields.name = "text";
networkSeries.dataFields.id = "text";
networkSeries.dataFields.value = "weight";

networkSeries.nodes.template.tooltipText = "{text}";
networkSeries.nodes.template.fillOpacity = 1;

networkSeries.nodes.template.label.text = "{text}"
networkSeries.fontSize =14;
networkSeries.maxLevels = 4;
networkSeries.maxRadius = am4core.percent(15);
networkSeries.minRadius = am4core.percent(3);
networkSeries.manyBodyStrength = -16;
networkSeries.nodes.template.label.hideOversized = true;
networkSeries.nodes.template.label.truncate = true;

  }

  load_data(){
    this.apiService.getTopCategory().subscribe(data => {
      this.recived_data=data['body'];
    });
  }
  
  preProc(data){
    let temp=[]
    for(var item in data){
      temp.push({
          name: data[item].text,
          value: data[item].weight,
      })
    }
    return temp
  }

}
