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
  login_url='http://127.0.0.1:8000/api/login/'

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return true;
  }

  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwMjE3NDUyLCJqdGkiOiI2NzYwNDE2YTU2NzQ0YmZiYWNlNTU5NjBkMTIzZjJlZCIsInVzZXJfaWQiOjF9.eZC6rVasPAgCazZucdPLt3KbUHMrZqyxpa1xta4WZuQ'  
  })

  login_user(email, pass){
    const user = {
      "username": email,
      "password" : pass
    }
    this.http.get<any>("http://127.0.0.1:8000/users/",{headers:this.httpHeaders}).subscribe((res) => {
      console.log(res,email,pass);
    })
  }
  getUsers(){
    this.http.get<any>("http://127.0.0.1:8000/users/",{headers:this.httpHeaders}).subscribe((res) => {
      console.log(res);
    }) 
  }
}
