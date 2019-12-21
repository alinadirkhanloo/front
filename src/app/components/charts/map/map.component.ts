import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import { ApiService } from 'src/app/services/api.service';
import { eventTarget } from '@amcharts/amcharts4/.internal/core/utils/DOM';
import am4themes_material from '@amcharts/amcharts4/themes/spiritedaway'

export interface News {
  text: string;
  link: string;
  title: string;
  date: string;
} 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  inputs:[`startdate`,`enddate`]
})


export class MapComponent implements OnInit {

  private country_id=[
    {value: 'AU',   key: 'australia'},
    {value: 'CN',   key: 'china'},
    {value: 'AR',   key: 'argentina'},
    {value: 'IO',   key: 'indian'},
    {value: 'TR',   key: 'turkey'},
    {value: 'IR',   key: 'iran'},
    {value: 'CF',   key: 'african'},
    {value: 'KP',   key: 'korea'},
    {value: 'MA',   key: 'morocco'},
    {value: 'ID',   key: 'indonesia'},
    {value: 'DK',   key: 'denmark'},  
    {value: 'MM',   key: 'myanmar'},
    {value: 'PK',   key: 'pakistan'},
    {value: 'CA',   key: 'canada'},
    {value: 'DE',   key: 'germany'},
    {value: 'UA',   key: 'ukraine'},
    {value: 'IT',   key: 'italy'},
    {value: 'SG',   key: 'singapore'},
    {value: 'IL',   key: 'israel'},
    {value: 'BR',   key: 'brazil'},
    {value: 'IN',   key: 'india'},
    {value: 'IE',   key: 'ireland'},
    {value: 'US',   key: 'usa'},
    {value: 'NL',   key: 'netherlands'},
    {value: 'PL',   key: 'poland'},
    {value: 'FR',   key: 'france'},
    {value: 'CO',   key: 'colombia'},
    {value: 'MX',   key: 'mexico'}, 
    {value: 'IQ',   key: 'iraq'},
    {value: 'ES',   key: 'spain'},
    {value: 'QA',   key: 'qatar'},
    {value: 'AF',   key: 'afghanistan'},
    {value: 'AT',   key: 'austria'},
    {value: 'IS',   key: 'iceland'},
    {value: 'FI',   key: 'finland'},
    {value: 'BY',   key: 'belarus'},
    {value: 'LU',   key: 'luxembourg'},
    {value: 'JP',   key: 'japan'},
    {value: 'RO',   key: 'romania'},
    {value: 'OM',   key: 'oman'},
    {value: 'NO',   key: 'norway'},
    {value: 'MN',   key: 'mongolia'}

  ]
  private recived_data=[]
  private count=0
  private news=[]
  private info:News
  country_ids;
  country_name;
  constructor(private apiService: ApiService) {

  }
  
  ngOnInit() { 
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.loadMapData(this.recived_data))}, 500)  
  }

  ngOnChanges(changes: SimpleChanges){ 
    if(changes['startdate'].firstChange==false){
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.loadMapData(this.recived_data)) }, 500)  
    }
  }

  loadChart(res_data){
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_material);
    // Create map instance
    var chart = am4core.create("chartdiv1", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldHigh;
    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.5)
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state
    polygonSeries.data =res_data

    // Set up heat legend
    let heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "left";
    heatLegend.valign = "bottom";
    heatLegend.width = am4core.percent(20);
    heatLegend.marginLeft= am4core.percent(8);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 100;

    // Set up custom heat map legend labels using axis ranges
    var minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = "کمترین";
    var maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = "بیشترین";

    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
      return "";
    });

    // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#3c5bdc");
    var lastSelected;
    var s;
    polygonTemplate.events.on("hit", (ev)=>{
        // This line serves multiple purposes:
        // 1. Clicking a country twice actually de-activates, the line below
        //    de-activates it in advance, so the toggle then re-activates, making it
        //    appear as if it was never de-activated to begin with.
        // 2. Previously activated ctries should be de-activated.  

        this.country_ids = ev.target.dataItem.dataContext["id"].toLowerCase( )
        this.country_name = ev.target.dataItem.dataContext["name"].toUpperCase( )
        this.getCountryNews(this.country_name);

        var x = document.getElementById("map-detail");
        var y = document.getElementById("chartdiv1");
        if( x.className.indexOf("w3-show")==-1){  
          x.className+=" w3-show"
          y.className+=" w3-hide"
        }else{
          x.className=x.className.replace(" w3-show","");
          y.className=y.className.replace(" w3-hide","");
        }
      ev.target.series.chart.zoomToMapObject(ev.target);
      if (lastSelected !== ev.target) {
        lastSelected = ev.target;
      }
    })
    chart.zoomControl = new am4maps.ZoomControl();
    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function(){
      chart.goHome();
    });
    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);


  }


  load_data(){
    this.apiService.getLocations().subscribe(data => {
      this.recived_data=data['body'];
    });

  }


  loadMapData(temp){
    var d=[]
    for (let i = 0; i <temp.length; i++) {
      for (let index = 0; index < this.country_id.length; index++) {
        if(temp[i].title== this.country_id[index].key){
          d.push({
            id:this.country_id[index].value ,
            value:temp[i].customData
          })
        }
      }
    }
    return d
  }

  getNews_info(index){
    this.info=this.news[index]
  }

  getCountryNews(country){
    this.apiService.getCountryNews(country.toLowerCase()).subscribe((data: {}) => {
      this.news=data['body'].posts;
      this.count=data['body'].post_count;
    });
  }

  show_map(){
    var x = document.getElementById("map-detail");
    var y = document.getElementById("chartdiv1");
    x.className=x.className.replace(" w3-show","");
    y.className=y.className.replace(" w3-hide","");
  }

}