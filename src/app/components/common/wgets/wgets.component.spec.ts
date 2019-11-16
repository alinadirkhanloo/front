import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WgetsComponent } from './wgets.component';

describe('WgetsComponent', () => {
  let component: WgetsComponent;
  let fixture: ComponentFixture<WgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
