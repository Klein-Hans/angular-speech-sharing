import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateUpdateFormComponent } from './user-create-update-form.component';

describe('UserCreateUpdateFormComponent', () => {
  let component: UserCreateUpdateFormComponent;
  let fixture: ComponentFixture<UserCreateUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
