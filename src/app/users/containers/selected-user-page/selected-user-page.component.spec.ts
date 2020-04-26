import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedUserPageComponent } from './selected-user-page.component';

describe('SelectedUserPageComponent', () => {
  let component: SelectedUserPageComponent;
  let fixture: ComponentFixture<SelectedUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
