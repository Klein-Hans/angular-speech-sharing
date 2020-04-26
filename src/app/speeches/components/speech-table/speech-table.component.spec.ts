import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTableComponent } from './speech-table.component';

describe('SpeechTableComponent', () => {
  let component: SpeechTableComponent;
  let fixture: ComponentFixture<SpeechTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
