import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ApiService],
})
export class AppComponent {
  title = 'Tahlil Khabar';
  constructor(private api:ApiService){
  }
}
