import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as moment from 'jalali-moment';
import { Platform } from '@angular/cdk/platform';
import { NativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  ngOnInit() {
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}


// export class CustomDateAdapter extends NativeDateAdapter {
//   constructor(matDateLocale: string) {
//     super(matDateLocale, new Platform());
//   }
//   format(date: Date, displayFormat: object): string {
//     var faDate = moment(date.toDateString()).locale('fa').format('YYYY/MM/DD');
//     return faDate;
//   }

//   public dateChange(event: any, dateInput: any,picker:any) {
//     var faDate = dateInput.value;
//     moment.locale('fa');
//     var enDateMomentFormat  = moment(faDate).locale('en');
//     var enDate = new Date(enDateMomentFormat.toLocaleString());
//     picker._validSelected = enDate;
//     picker.startAt = enDate;
// }
// }


