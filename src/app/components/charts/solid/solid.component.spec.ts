import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidComponent } from './solid.component';

describe('SolidComponent', () => {
  let component: SolidComponent;
  let fixture: ComponentFixture<SolidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
