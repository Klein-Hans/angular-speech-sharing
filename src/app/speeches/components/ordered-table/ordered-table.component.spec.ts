import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTableComponent } from './ordered-table.component';

describe('OrderedTableComponent', () => {
  let component: OrderedTableComponent;
  let fixture: ComponentFixture<OrderedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
