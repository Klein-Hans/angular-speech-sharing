import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeechPageAction } from '../../actions';
import { Speech } from 'app/speeches/models';
import * as fromSpeeches from '../../reducers';

@Component({
  selector: 'app-speech-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './speech-member-page.component.html',
  styleUrls: ['./speech-member-page.component.scss']
})
export class SpeechMemberPageComponent implements OnInit {
  
  speeches$: Observable<Speech[]>;

  constructor(
    private store: Store<fromSpeeches.State>
  ) {
    this.speeches$ = this.store.pipe(select(fromSpeeches.selectAllSpeeches)); 
  }

  ngOnInit() {
    this.store.dispatch(SpeechPageAction.loadSpeeches());
  }

}
