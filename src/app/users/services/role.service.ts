import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../models/';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  
  private roleCollection: AngularFirestoreCollection<Role>;
  private roles$: Observable<Role []>;
  private roleDoc: AngularFirestoreDocument<Role>;

  constructor(private afs: AngularFirestore){
    this.roleCollection = afs.collection<Role>('roles');
  }

  getAll() {
    return this.roleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Role;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}