import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeechAction } from '../actions';
import { Speech } from 'app/speeches/models';
import * as fromSpeeches from '../reducers';

@Component({
  selector: 'app-speech-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="wrapper">
    <div class="container">
      <speech-table [speeches]="speeches$ | async" ></speech-table>
    </div>
  </div>`,
  styles: [`
    
  `]
})
export class SpeechMemberPageComponent implements OnInit {
  
  speeches$: Observable<Speech[]>;

  constructor(
    private store: Store<fromSpeeches.State>
  ) {
    this.speeches$ = this.store.pipe(select(fromSpeeches.selectAllSpeeches)); 
  }

  ngOnInit() {
    this.store.dispatch(SpeechAction.loadSpeeches());
    
    // this.store.pipe(select(fromSpeeches.getSpeeches)).subscribe(res => {
    //   console.log(res['entities'])
    // });
  }

}
