import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResColumnComponent } from './res-column.component';

describe('ResColumnComponent', () => {
  let component: ResColumnComponent;
  let fixture: ComponentFixture<ResColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
