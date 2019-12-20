import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  start_date:string
  end_date:string
  constructor(private http:HttpClient,private data_sharing:DataSharingService) {
    const sd=this.data_sharing.start_date;
    const ed=this.data_sharing.end_date;
    sd.subscribe((date:string)=>{
      this.start_date=date
    })
    ed.subscribe((date:string)=>{
      this.end_date=date
    })
  }



  baseurl="http://192.168.204.170:8001/api/v1/upload"

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return true;
  }

  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': ''  
  })

  getLocations(){
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/location-stats",{headers:this.httpHeaders})
  }

  getNumberOfNews(){
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/news-statistics",{headers:this.httpHeaders})
  }

  getNumberOfSites(){
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/rss-statistics",{headers:this.httpHeaders})
  }

  getTOpWords(){
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    console.log(params)
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-words",{headers:this.httpHeaders,params:params})
  }

  getSentiment(){
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/sentiment-stats",{headers:this.httpHeaders})
  }

  getTopPlatforms(){
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-platform",{headers:this.httpHeaders})
  }

  getTopCategory(){
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-category",{headers:this.httpHeaders})
  }


  getCategoryNews(category){
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/category-news",{category},{headers:this.httpHeaders}); 
  }

  getCountryNews(country){
    var start=this.start_date;
    var end=this.end_date;
    this.http.post<any>("http://192.168.204.170:8001/api/v1/country-news",{country:country,start_date:'1398/08/01',end_date:end},{headers:this.httpHeaders}).subscribe((data: {}) => {
      console.log(data);
    });
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/country-news",{country,start,end},{headers:this.httpHeaders});
  }

  getPlatformNews(platform){
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/platform-news",{platform},{headers:this.httpHeaders}); 
  }


  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
