import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeechAction } from '../../actions';
import { Speech } from 'app/speeches/models';
import * as fromSpeeches from '../../reducers';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-speeches',
  templateUrl: './speech-admin.component.html',
  styleUrls: ['./speech-admin.component.scss']
})
export class SpeechAdminComponent implements OnInit {

  isUserEnterName: boolean = true;
  name: String;
  addSpeech: {
    subject: String,
    content: String,
  }
  viewSpeech: Object;
  date = Date.now();
  speeches$: Observable<Speech[]>;
  speech$: Observable<any[]>;
  private itemDoc: AngularFirestoreDocument;
  group$: Observable<any[]>;

  constructor(
    private store: Store<fromSpeeches.State>) { 
    // this.speech$ = store.pipe(select(fromSpeeches.selectSelectedBook));
    // this.itemDoc = afs.doc<Speech>
    // this.speeches$ = afs.collection('speeches').valueChanges();
    // this.group$ = afs.collection('group').valueChanges();
    this.speeches$ = store.pipe(select(fromSpeeches.selectAllSpeeches));
  }

  ngOnInit() {
    this.store.dispatch(SpeechAction.loadSpeeches());
    console.log(this.speeches$);
  }

  onEnterName(e) {
    e.preventDefault();
    console.log(this.name);
    this.isUserEnterName = true;
  }

  // onSelectSpeech(id) {
  //   this.speeches.map((item) => {
  //     if(item.id === id){
  //       item.isActive = true
  //       let formattedDate = new FormControl(new Date(item.publishedDate));
  //       this.viewSpeech = { ...item, formattedDate };
  //       console.log(this.viewSpeech);
  //     }
  //     else 
  //     {
  //       item.isActive = false;
  //     }
  //   });
  // }
}
