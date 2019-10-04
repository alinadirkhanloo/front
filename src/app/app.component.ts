import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ApiService]
})
export class AppComponent {
  title = 'demo-one';
  users=[{name:'ali'}]
  constructor(private api:ApiService){
    this.getUsers();
  }

  getUsers=()=>{

  }
}
