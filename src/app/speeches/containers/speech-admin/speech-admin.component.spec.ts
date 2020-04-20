import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAdminComponent } from './speech-admin.component';

describe('SpeechAdminComponent', () => {
  let component: SpeechAdminComponent;
  let fixture: ComponentFixture<SpeechAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
