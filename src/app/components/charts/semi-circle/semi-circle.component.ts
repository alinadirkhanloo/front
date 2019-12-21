import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ApiService } from 'src/app/services/api.service';
import am4themes_material from '@amcharts/amcharts4/themes/spiritedaway'

@Component({
  selector: 'app-semi-circle',
  templateUrl: './semi-circle.component.html',
  styleUrls: ['./semi-circle.component.scss'],
  inputs:[`startdate`,`enddate`]
})
export class SemiCircleComponent implements OnInit {
  private recived_data=[]

  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.preProc(this.recived_data)) }, 500)
  }

  ngOnChanges(changes: SimpleChanges){ 
    if(changes['startdate'].firstChange==false){
    this.load_data();
    setTimeout(()=>{ this.loadChart(this.preProc(this.recived_data)) }, 500) 
    } 
  }

  loadChart(data){

    // Themes begin

    // Themes begin
    am4core.useTheme(am4themes_animated);

    // am4core.useTheme(am4themes_material);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv6", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];

    pieSeries.alignLabels = false;
    // pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0,0,0,0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();


    chart.data = data

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
        
        country: data[item].name,
        litres: data[item].y
        
      } )
    }
    return temp
  }

}
