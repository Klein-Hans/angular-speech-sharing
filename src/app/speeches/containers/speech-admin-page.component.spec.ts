import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAdminPageComponent } from './speech-admin-page.component';

describe('SpeechAdminPageComponent', () => {
  let component: SpeechAdminPageComponent;
  let fixture: ComponentFixture<SpeechAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
