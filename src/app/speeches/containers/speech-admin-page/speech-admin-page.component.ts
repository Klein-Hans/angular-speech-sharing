import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SpeechPageAction } from '../../actions';
import { Speech } from 'app/speeches/models';
import * as fromSpeeches from '../../reducers';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Dictionary, Update } from '@ngrx/entity';
import { first, take, tap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-speeches',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './speech-admin-page.component.html',
  styleUrls: ['./speech-admin-page.component.scss']
})
export class SpeechAdminPageComponent implements OnInit {

  date = Date.now();
  speeches$: Observable<Speech[]>;
  selectedSpeech$: Observable<Speech>;
  selectedSpeechId$: Observable<string>;
  selectedSpeechForm: FormGroup;
  newSpeechForm: FormGroup;
  newSpeechToastNotif$: Observable<object>;
  // private showNewSpeechNotif$: Observable<boolean>;


  constructor(
    private afs: AngularFirestore,
    private store: Store<fromSpeeches.State>,
    private formBuilder: FormBuilder) {
    this.speeches$ = store.pipe(select(fromSpeeches.selectAllSpeeches));
    this.selectedSpeech$ = store.pipe(select(fromSpeeches.selectSelectedSpeech));
    this.selectedSpeechId$ = store.pipe(select(fromSpeeches.selectSelectedSpeechId));
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch(SpeechPageAction.loadSpeeches());
    this.speeches$.subscribe(speeches => {
      speeches.map((speech, index) => {
        if(index === 0)
          this.store.dispatch(SpeechPageAction.selectSpeech({ id: speech.id }))
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
    this.store.dispatch(SpeechPageAction.selectSpeech({ id: id }));
  }

  onAddSpeech(speech: Speech) {
    speech.publishedDate = new Date();
    speech.author = "Klein-Hans";
    this.store.dispatch(SpeechPageAction.addSpeech({ speech }));
    this.newSpeechForm.reset();
    let notifContent = {
      message: 'New Speech has been Added Successfully',
      type: 'success',
    }
    this.showNotif(notifContent);
  }

  onUpdateSpeech(speech: Speech) {
    this.store.dispatch(SpeechPageAction.updateSpeech({ speech }));
    let notifContent = {
      message: `Speech has been Updated Successfully`,
      type: 'success',
    }
    this.showNotif(notifContent);
  }

  onDeleteSpeech(speech: Speech) {
    this.store.dispatch(SpeechPageAction.deleteSpeech({ speech }));
    let notifContent = {
      message: `Speech has been Deleted Successfully`,
      type: 'danger',
    }
    this.showNotif(notifContent);
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

    this.newSpeechForm = new FormGroup({
      'subject': new FormControl(),
      'content': new FormControl(),
    });
  }

  showNotif(content) {
    $.notify({
      icon: content.icon ? content.icon : 'notifications',
      message: content.message ? content.message : ''
    },{
      type: content.type ? content.type : 'success',
      timer: content.timer ? content.timer : '300',
      placement: content.placement ? content.placement : { from: 'top', align: 'center' },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    });
  }
}
