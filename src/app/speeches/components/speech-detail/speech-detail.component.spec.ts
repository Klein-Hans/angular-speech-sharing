import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDetailComponent } from './speech-detail.component';

describe('SpeechDetailComponent', () => {
  let component: SpeechDetailComponent;
  let fixture: ComponentFixture<SpeechDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
