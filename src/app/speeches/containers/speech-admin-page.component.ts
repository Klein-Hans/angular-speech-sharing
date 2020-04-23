import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeechAction } from '../actions';
import { Speech } from 'app/speeches/models';
import * as fromSpeeches from '../reducers';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Dictionary } from '@ngrx/entity';
import { first, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-speeches',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="wrapper">
    <div class="main-panel w-100">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8 col-md-12 mx-auto">
            <nav-tab-table
              [speeches]="speeches$ | async"
              [selectedSpeech]="selectedSpeech$ | async"
              [selectedSpeechId]="selectedSpeechId$ | async"
              [selectedSpeechForm]="selectedSpeechForm"
              (selectSpeech)="onSelectSpeech($event)">
            </nav-tab-table>
            </div> <!-- end of col -->
        </div> <!-- end of row -->
      </div> <!-- end of container-fluid -->
    </div>
  </div>
  `,
  styles: [`
    .logo{
        width: 3em;
    }
  `]
})
export class SpeechAdminPageComponent implements OnInit {

  date = Date.now();
  speeches$: Observable<Speech[]>;
  selectedSpeech$: Observable<Speech>;
  selectedSpeechId$: Observable<string>;
  selectedSpeechForm: FormGroup;
  addSpeechForm: FormGroup;

  constructor(
    private store: Store<fromSpeeches.State>,
    private formBuilder: FormBuilder) {
    this.speeches$ = store.pipe(select(fromSpeeches.selectAllSpeeches));
    this.selectedSpeech$ = store.pipe(select(fromSpeeches.selectSelectedSpeech));
    this.selectedSpeechId$ = store.pipe(select(fromSpeeches.selectSelectedSpeechId));
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch(SpeechAction.loadSpeeches());
    this.speeches$.subscribe(speeches => {
      speeches.map((speech, index) => {
        if(index === 0)
          this.store.dispatch(SpeechAction.selectSpeech({ id: speech.id }))
      })

      this.selectedSpeech$.subscribe(speech => {
        if(speech){
          this.selectedSpeechForm = new FormGroup({
            'id': new FormControl(speech.id),
            'subject': new FormControl(speech.subject),
            'content': new FormControl(speech.content),
            'author': new FormControl(speech.author),
            'group': new FormControl(speech.group),
            'publishedDate': new FormControl(new Date(speech.publishedDate.toDate())),
          });
        }
      })
    });
  }

  onSelectSpeech(id) {
    this.store.dispatch(SpeechAction.selectSpeech({ id: id }));
  }

  buildForm() {
    this.selectedSpeechForm = new FormGroup({
      'id': new FormControl(),
      'subject': new FormControl(),
      'content': new FormControl(),
      'author': new FormControl(),
      'group': new FormControl(),
      'publishedDate': new FormControl(),
    });

    this.addSpeechForm = new FormGroup({
      'subject': new FormControl(),
      'content': new FormControl(),
    });
  }
}
