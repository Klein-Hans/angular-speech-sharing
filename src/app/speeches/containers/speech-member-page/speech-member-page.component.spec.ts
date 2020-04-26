import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechMemberPageComponent } from './speech-member-page.component';

describe('SpeechMemberPageComponent', () => {
  let component: SpeechMemberPageComponent;
  let fixture: ComponentFixture<SpeechMemberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechMemberPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
