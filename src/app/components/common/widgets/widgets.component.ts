import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  rss_num:number;
  news_num:number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.news_num=0
    this.rss_num=0
    setTimeout(()=>{this.load_data()}, 1000)
  }
  load_data(){
    
    this.apiService.getNumberOfNews().subscribe(data => {
      this.news_num=data['body'].number_of_news;
      
    });
    this.apiService.getNumberOfSites().subscribe(data => {
      this.rss_num=data['body'].number_of_rss;
    });
  }
}
