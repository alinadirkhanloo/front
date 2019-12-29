import { Injectable } from '@angular/core';
import * as jalaliMoment from "jalali-moment";
import { Observable, BehaviorSubject } from 'rxjs';
import { News } from '../components/charts/map/map.component';
// import {start_date,end_date} from '../components/date-picker/date-picker.component'
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  // public start_date=this.format(this.today(),"jYYYY/jMM/jDD");


  public start_date:BehaviorSubject<any>;
  public end_date:BehaviorSubject<any>;

  private news: BehaviorSubject<News>;
  
  constructor() { 
    this.start_date=new BehaviorSubject(this.format(this.today(),"jYYYY/jMM/jDD"));
    this.end_date=new BehaviorSubject(this.format(this.today(),"jYYYY/jMM/jDD"));
    this.news = new BehaviorSubject(null);

  }
  today(): jalaliMoment.Moment {
    return jalaliMoment().locale("fa");
  }
  format(date: jalaliMoment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error("JalaliMomentDateAdapter: Cannot format invalid date.");
    }
    // console.log('8--',displayFormat,date,date.format(displayFormat));  
    return date.format(displayFormat);
  }
  clone(date: jalaliMoment.Moment): jalaliMoment.Moment {
    return date.clone().locale("fa");
  }
  isValid(date: jalaliMoment.Moment): boolean {
    return this.clone(date).isValid();
  }

  setNews(news){    
    this.news.next(news);
  }
  
  getNews(){
    return this.news.asObservable();
  }


}
