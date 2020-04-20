import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Speech } from '../models/speech';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  
  private speechCollection: AngularFirestoreCollection<Speech>;
  private speeches$: Observable<Speech []>;

  constructor(private afs: AngularFirestore){
    this.speechCollection = afs.collection<Speech>('speeches');
  }

  getAll() {
    return this.speechCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Speech;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addSpeech(speech: Speech) {
    this.speechCollection.add(speech);
  }

}
