import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {
  private recived_data=[]
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.load_data();
    setTimeout(()=>{ this.loadChart(this.preProc(this.recived_data)) }, 1000)
    

  }



loadChart(data){
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  
  var chart = am4core.create("chartdiv2", am4plugins_wordCloud.WordCloud );

  var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
  series.accuracy = 4;
  series.step = 15;
  series.rotationThreshold = 0.7;
  series.maxCount = 200;
  series.minWordLength = 2;
  series.labels.template.margin(4,4,4,4);
  series.maxFontSize = am4core.percent(30);
  
  // series.text = "Though yet of Hamlet our dear brother's death The memory be green, The The The green"; 
  series.data=data
  
  series.dataFields.word = "tag";
  series.dataFields.value = "weight";
  series.colors = new am4core.ColorSet();
  series.colors.passOptions = {}; // makes it loop
   
  //series.labelsContainer.rotation = 45;
  series.angles = [0,-90];
  series.fontWeight = "700"
  
  // setInterval(function () {
  //   series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value",
  //    Math.round(Math.random() * 10));
  //  }, 10000)
}

load_data(){
  this.apiService.getTOpWords().subscribe(data => {
    this.recived_data=data['body'];
  });
}

preProc(data){
  let temp=[]
  for(var item in data){
    temp.push({
      tag:data[item].text,
      weight:data[item].weight
    })
  }
  return temp
}

}
