import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTabTableComponent } from './nav-tab-table.component';

describe('NavTabTableComponent', () => {
  let component: NavTabTableComponent;
  let fixture: ComponentFixture<NavTabTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTabTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTabTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
