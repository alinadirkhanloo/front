import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  top_country=[];
  private country_id=[
    {value: 'AU',   key: 'australia'},
    {value: 'CN',   key: 'china'},
    {value: 'AR',   key: 'argentina'},
    {value: 'IO',   key: 'indian'},
    {value: 'TR',   key: 'turkey'},
    {value: 'IR',   key: 'iran'},
    {value: 'CF',   key: 'african'},
    {value: 'KP',   key: 'korea'},
    {value: 'MA',   key: 'morocco'},
    {value: 'ID',   key: 'indonesia'},
    {value: 'DK',   key: 'denmark'},  
    {value: 'MM',   key: 'myanmar'},
    {value: 'PK',   key: 'pakistan'},
    {value: 'CA',   key: 'canada'},
    {value: 'DE',   key: 'germany'},
    {value: 'UA',   key: 'ukraine'},
    {value: 'IT',   key: 'italy'},
    {value: 'SG',   key: 'singapore'},
    {value: 'IL',   key: 'israel'},
    {value: 'BR',   key: 'brazil'},
    {value: 'IN',   key: 'india'},
    {value: 'IE',   key: 'ireland'},
    {value: 'US',   key: 'usa'},
    {value: 'NL',   key: 'netherlands'},
    {value: 'PL',   key: 'poland'},
    {value: 'FR',   key: 'france'},
    {value: 'CO',   key: 'colombia'},
    {value: 'MX',   key: 'mexico'}, 
    {value: 'IQ',   key: 'iraq'},
    {value: 'ES',   key: 'spain'},
    {value: 'QA',   key: 'qatar'},
    {value: 'AF',   key: 'afghanistan'},
    {value: 'AT',   key: 'austria'},
    {value: 'IS',   key: 'iceland'},
    {value: 'FI',   key: 'finland'},
    {value: 'BY',   key: 'belarus'},
    {value: 'LU',   key: 'luxembourg'},
    {value: 'JP',   key: 'japan'},
    {value: 'RO',   key: 'romania'},
    {value: 'OM',   key: 'oman'},
    {value: 'NO',   key: 'norway'},
    {value: 'MN',   key: 'mongolia'}

  ]
 
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.load_data();
    this.top_country=[]
    setTimeout(()=>{this.load_data()}, 1000)
  }



  load_data(){
    this.apiService.getLocations().subscribe(data => {
      for (let index = 0; index <20; index++) {
        this.top_country.push(data['body'][index]);
                
      }
    });
  }
}
