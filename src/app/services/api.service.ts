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
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTcwMjE3NDUyLCJqdGkiOiI2NzYwNDE2YTU2NzQ0YmZiYWNlNTU5NjBkMTIzZjJlZCIsInVzZXJfaWQiOjF9.eZC6rVasPAgCazZucdPLt3KbUHMrZqyxpa1xta4WZuQ'  })

  login_user(email, pass){
    const user = {
      "username": email,
      "password" : pass
    }
    this.http.get<any>("http://127.0.0.1:8000/users/",{headers:this.httpHeaders}).subscribe((res) => {
      console.log(res,email,pass);
    })
  }

  // import { Injectable } from '@angular/core';
  // import { HttpClient, HttpResponse } from '@angular/common/http';
  // import { Observable } from 'rxjs';
  
  // import { SERVER_API_URL } from 'app/app.constants';
  // import { createRequestOption } from 'app/shared';
  // import { ICategory } from 'app/shared/model/category.model';
  
  // type EntityResponseType = HttpResponse<ICategory>;
  // type EntityArrayResponseType = HttpResponse<ICategory[]>;
  
  // @Injectable({ providedIn: 'root' })
  // export class CategoryService {
  //   public resourceUrl = SERVER_API_URL + 'api/categories';
  
  //   constructor(protected http: HttpClient) {}
  
  //   create(category: ICategory): Observable<EntityResponseType> {
  //     return this.http.post<ICategory>(this.resourceUrl, category, { observe: 'response' });
  //   }
  
  //   update(category: ICategory): Observable<EntityResponseType> {
  //     return this.http.put<ICategory>(this.resourceUrl, category, { observe: 'response' });
  //   }
  
  //   find(id: number): Observable<EntityResponseType> {
  //     return this.http.get<ICategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  //   }
  
  //   query(req?: any): Observable<EntityArrayResponseType> {
  //     const options = createRequestOption(req);
  //     return this.http.get<ICategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  //   }
  
  //   delete(id: number): Observable<HttpResponse<any>> {
  //     return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  //   }
}
