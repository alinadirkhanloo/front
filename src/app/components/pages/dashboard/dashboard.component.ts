import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  rss_num:number;
  news_num:number;
  top_country=[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.load_data();
    this.news_num=0
    this.rss_num=0
    this.top_country=[]
    setTimeout(()=>{this.load_data1(); this.load_data2();this.load_data3()}, 1000)
  }

  load_data1(){
    
    this.apiService.getNumberOfNews().subscribe(data => {
      this.news_num=data['body'].number_of_news;
    });
  }

  load_data2(){
    this.apiService.getNumberOfSites().subscribe(data => {
      this.rss_num=data['body'].number_of_rss;
    });
  }

  load_data3(){
    this.apiService.getLocations().subscribe(data => {
      // this.top_country=data['body'];
      // console.log(data['body'])
      for (let index = 0; index <30; index++) {
        this.top_country.push(data['body'][index]);
                
      }
    });
  }
}
