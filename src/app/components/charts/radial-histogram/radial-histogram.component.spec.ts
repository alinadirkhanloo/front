import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialHistogramComponent } from './radial-histogram.component';

describe('RadialHistogramComponent', () => {
  let component: RadialHistogramComponent;
  let fixture: ComponentFixture<RadialHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialHistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
