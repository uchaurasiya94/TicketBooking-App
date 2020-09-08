import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusSeatComponent } from './select-bus-seat.component';

describe('SelectBusSeatComponent', () => {
  let component: SelectBusSeatComponent;
  let fixture: ComponentFixture<SelectBusSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBusSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBusSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
