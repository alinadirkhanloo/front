import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiCircleComponent } from './semi-circle.component';

describe('SemiCircleComponent', () => {
  let component: SemiCircleComponent;
  let fixture: ComponentFixture<SemiCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemiCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
