import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeechPageAction } from '../../actions';
import { Speech } from 'app/speeches/models';
import * as fromSpeeches from '../../reducers';
import { map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-speeches',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './speech-admin-page.component.html',
  styleUrls: ['./speech-admin-page.component.scss']
})
export class SpeechAdminPageComponent implements OnInit {

  private speeches$: Observable<Speech[]>;
  private selectedSpeech$: Observable<Speech>;
  private selectedSpeechId$: Observable<string>;
  private selectedSpeechForm: FormGroup;
  private newSpeechForm: FormGroup;
  private newSpeechToastNotif$: Observable<object>;

  constructor(
    private store: Store<fromSpeeches.State>,
    private fb: FormBuilder
  ) {
    this.speeches$ = store.pipe(select(fromSpeeches.selectAllSpeeches));
    this.selectedSpeech$ = store.pipe(select(fromSpeeches.selectSelectedSpeech));
    this.selectedSpeechId$ = store.pipe(select(fromSpeeches.selectSelectedSpeechId));
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch(SpeechPageAction.loadSpeeches());
    this.speeches$.subscribe(speeches => {
      console.log(speeches)
      speeches.map((speech, index) => {
        if(index === 0)
          this.store.dispatch(SpeechPageAction.selectSpeech({ id: speech.id }))
      })

      this.selectedSpeech$.subscribe(speech => {
        if(speech){
          this.selectedSpeechForm = this.fb.group({
            id: [speech.id],
            subject: [speech.subject],
            content: [speech.content],
            author: [speech.author],
            group: [speech.group],
            publishedDate: [new Date(speech.publishedDate.toDate())],
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
    this.selectedSpeechForm = this.fb.group({
      id: [''],
      subject: [''],
      content: [''],
      author: [''],
      group: [''],
      publishedDate: [''],
    });

    this.newSpeechForm = this.fb.group({
      subject: ['', [Validators.required]],
      content:  ['', [Validators.required]],
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
