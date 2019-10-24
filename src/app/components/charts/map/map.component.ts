import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import { ApiService } from 'src/app/services/api.service';

export interface MapData {
  title: string;
  customData:number
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
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

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    
    this.load_data();
    
    setTimeout(()=>{ this.load_map(this.loadMapData(this.recived_data)) }, 1000)
    
}


load_map(res_data){

  am4core.useTheme(am4themes_animated);
// Themes begin

// Themes end

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
  max: chart.colors.getIndex(1).brighten(-0.3)
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
heatLegend.maxValue = 40000000;

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
}