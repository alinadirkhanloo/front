import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
  email: string;
  password: string;
  constructor(private router: Router , private apiService: ApiService) {}
  public login(email: string, password: string) {
      // this.apiService.getCountryNews("iran").subscribe((data: {}) => {
      //   console.log(data['body'].posts);
      // });
      this.router.navigate(['sidenav/dashboard'], { replaceUrl: true });
  }
  ngOnInit() {}
}
