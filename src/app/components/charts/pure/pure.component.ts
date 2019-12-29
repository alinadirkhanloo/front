import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"
import { ApiService } from 'src/app/services/api.service';
import { News } from '../map/map.component';
import am4themes_material from '@amcharts/amcharts4/themes/spiritedaway'
import { Router } from '@angular/router';



@Component({
  selector: 'app-pure',
  templateUrl: './pure.component.html',
  styleUrls: ['./pure.component.scss'],
  inputs:[`startdate`,`enddate`]
})
export class PureComponent implements OnInit {

  private recived_data=[]
  private news=[]
  private info:News
  private count=0;
  category_name;


  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit() {
    this.load_data();
    setTimeout(()=>{ 
      this.loadChart(this.recived_data) 
    }, 500)
  }

  ngOnChanges(changes: SimpleChanges){ 
    if(changes['startdate'].firstChange==false){
    this.load_data();
    setTimeout(()=>{  this.loadChart(this.recived_data) }, 500)  
    }
  }

  loadChart(data){
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // am4core.useTheme(am4themes_material);
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


      networkSeries.nodes.template.events.on("hit", (ev)=>{
      this.category_name = ev.target.dataItem.dataContext["text"].toUpperCase( )
      this.CategoryNews(this.category_name);
    
        var x = document.getElementById("category-news-detail");
        var y = document.getElementById("chartdiv3");
        if( x.className.indexOf("w3-show")==-1){  
          x.className+=" w3-show"
          y.className+=" w3-hide"
        }else{
          x.className=x.className.replace(" w3-show","");
          y.className=y.className.replace(" w3-hide","");
        }
    
    })

    }

  load_data(){
    this.apiService.getTopCategory().subscribe(data => {
      this.recived_data=data['body'];
    });
  }
  
  getNews_info(index){
    this.info=this.news[index];
    this.router.navigate([`/sidenav/dashboard/news-details/${index}`]);
  }
  
  show_chart(){
    var x = document.getElementById("category-news-detail");
    var y = document.getElementById("chartdiv3");
    x.className=x.className.replace(" w3-show","");
    y.className=y.className.replace(" w3-hide","");
  }
  
  CategoryNews(category){

    this.apiService.getCategoryNews(category.toLowerCase()).subscribe((data: {}) => {
      this.news=data['body'].posts;
      this.count=data['body'].post_count;

    });
  }
  

}
