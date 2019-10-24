import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {MapData} from  './../components/charts/map/map.component'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}
  baseurl="http://192.168.204.170:8001/api/v1/upload"
  // login_url='http://127.0.0.1:8000/api/login/'

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
    return this.http.get<any>("http://192.168.204.170:8001/api/v1/top-words",{headers:this.httpHeaders})
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
