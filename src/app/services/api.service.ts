import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}
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


  getCategoryNews(category){
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/category-news",{category},{headers:this.httpHeaders}); 
  }


  getCountryNews(country){
    return this.http.post<any>("http://192.168.204.170:8001/api/v1/country-news",{country},{headers:this.httpHeaders});
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
