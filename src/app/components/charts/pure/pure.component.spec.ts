import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PureComponent } from './pure.component';

describe('PureComponent', () => {
  let component: PureComponent;
  let fixture: ComponentFixture<PureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
