import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

export interface TopCountry {
  id: string;
  count: string;
  name: string;
} 


@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss']
})
export class Map2Component implements OnInit {

  top_country= [];
  temp:TopCountry;
  private country_id=[
    {value: 'au',   key: 'australia'},
    {value: 'cn',   key: 'china'},
    {value: 'ar',   key: 'argentina'},
    {value: 'io',   key: 'indian'},
    {value: 'tr',   key: 'turkey'},
    {value: 'Iir',   key: 'iran'},
    {value: 'cf',   key: 'african'},
    {value: 'kp',   key: 'korea'},
    {value: 'ma',   key: 'morocco'},
    {value: 'id',   key: 'indonesia'},
    {value: 'dk',   key: 'denmark'},  
    {value: 'mm',   key: 'myanmar'},
    {value: 'pk',   key: 'pakistan'},
    {value: 'ca',   key: 'canada'},
    {value: 'de',   key: 'germany'},
    {value: 'ua',   key: 'ukraine'},
    {value: 'it',   key: 'italy'},
    {value: 'sg',   key: 'singapore'},
    {value: 'il',   key: 'israel'},
    {value: 'br',   key: 'brazil'},
    {value: 'in',   key: 'india'},
    {value: 'ie',   key: 'ireland'},
    {value: 'us',   key: 'usa'},
    {value: 'nl',   key: 'netherlands'},
    {value: 'pl',   key: 'poland'},
    {value: 'fr',   key: 'france'},
    {value: 'co',   key: 'colombia'},
    {value: 'mx',   key: 'mexico'}, 
    {value: 'iq',   key: 'iraq'},
    {value: 'es',   key: 'spain'},
    {value: 'qa',   key: 'qatar'},
    {value: 'af',   key: 'afghanistan'},
    {value: 'at',   key: 'austria'},
    {value: 'is',   key: 'iceland'},
    {value: 'fi',   key: 'finland'},
    {value: 'by',   key: 'belarus'},
    {value: 'lu',   key: 'luxembourg'},
    {value: 'jp',   key: 'japan'},
    {value: 'ro',   key: 'romania'},
    {value: 'om',   key: 'oman'},
    {value: 'no',   key: 'norway'},
    {value: 'mn',   key: 'mongolia'}

  ]
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.top_country=[]
    this.load_data();    
  }



  load_data(){
    this.apiService.getLocations().subscribe(data => {
      for (let i = 0; i <data['body'].length; i++) {
        for (let index = 0; index < this.country_id.length; index++) {
          if(data['body'][i].title== this.country_id[index].key){  
          this.top_country.push({
            id:this.country_id[index].value,
            name:data['body'][i].title,
            count:data['body'][i].customData
        });  
      }
    }
    }
    });
  }

}
