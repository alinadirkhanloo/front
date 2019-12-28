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
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    // console.log('apiservice:getlocations()','start',this.start_date,'end',this.end_date)
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/location-stats",{headers:this.httpHeaders,params:params})
  }

  getNumberOfNews(){
    var v=this.http.get<any>("http://192.168.204.170:8001/api/v1/news-statistics",{headers:this.httpHeaders})
    return v
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
    // console.log(params)
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-words",{headers:this.httpHeaders,params:params})
  }

  getSentiment(){
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    var res=this.http.get<any>("http://192.168.204.170:8001/api/v1/sentiment-stats",{headers:this.httpHeaders,params:params});
    // console.log('apiservice:getlocations()','start',this.start_date,'end',this.end_date,res)
    return res
  }

  getTopPlatforms(){
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    // console.log('apiservice:getlocations()','start',this.start_date,'end',this.end_date)
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-platform",{headers:this.httpHeaders,params:params})
  }

  getTopCategory(){
    const params = new HttpParams({
      fromObject: {
        start_date: this.start_date,
        end_date: this.end_date,
      }
    });
    // console.log('apiservice:getlocations()','start',this.start_date,'end',this.end_date)
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-category",{headers:this.httpHeaders,params:params})
  }


  getCategoryNews(category){
    const start=this.start_date;
    const end=this.end_date;
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/category-news",{category:category,start_date:start,end_date:end},{headers:this.httpHeaders}); 
  }

  getCountryNews(country){
    const start=this.start_date;
    const end=this.end_date;
    console.log('start-date:',start," end-date:",end)
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/country-news",{country:country,start_date:start,end_date:end},{headers:this.httpHeaders});  
  }

  getPlatformNews(platform){
    var start=this.start_date;
    var end=this.end_date;
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/platform-news",{platform:platform,start_date:start,end_date:end},{headers:this.httpHeaders}); 
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
