import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/components/charts/map/map.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  private info: News;
  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.dataSharingService.getNews().subscribe((res: News) => {
      this.info = res;
    });
    // console.log(this.info);
    
  }



}
