import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}

  baseurl='http://127.0.0.1:8000'
  login_url='http://127.0.0.1:8000/api/login'

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return true;
  }

  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    // 'Authorization': 'Bearer ' + this.authenticationService.token 
  })
  // constructor(private http:HttpClient) { }

  login_user(email, pass){
    const user = {
      "username": email,
      "password" : pass
    }
    this.http.post<any>(this.login_url,{SomeDate:user},{headers:this.httpHeaders}).subscribe((res) => {
      console.log(res,email,pass);
    })
  }

  // loggedIn(){
  //   return !!localStorage.getItem('token')
  // }

}
