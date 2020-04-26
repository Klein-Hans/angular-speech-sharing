import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Speech } from '../models/speech';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  
  private speechCollection: AngularFirestoreCollection<Speech>;
  private speeches$: Observable<Speech []>;
  private speechDoc: AngularFirestoreDocument<Speech>;

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

  add(speech: Speech) {
    let id: string;
    this.speechCollection.add({
      ...speech
    }).then(res => { id = res.id });
    return this.afs.collection('speeches', ref => ref.where('id', '==', id)).valueChanges();
  }

  update(speech: Speech) {
    this.speechDoc = this.afs.doc<Speech>(`speeches/${speech.id}`);
    this.speechDoc.set({...speech});  
    return this.speechDoc.valueChanges();
  }

  delete(id: string) {
    console.log(id)
    this.speechDoc = this.afs.doc<Speech>(`speeches/${id}`);
    this.speechDoc.delete();
    this.speechDoc.valueChanges().subscribe(e => console.log(e))
    return of(id);
  }

}
