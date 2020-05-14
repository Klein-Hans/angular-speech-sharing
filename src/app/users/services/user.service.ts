import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, tap, catchError, switchMap, mergeMap, combineLatest, skipUntil, take, flatMap, filter, first } from 'rxjs/operators';
import { User, Role } from '../models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth/';
import { FirestoreService } from 'app/core/services';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userCollection: AngularFirestoreCollection<User>;
  private users$: Observable<User[]>;
  private userDoc: AngularFirestoreDocument<User>;
  private roleDoc: AngularFirestoreDocument<Role>;

  constructor(
    private db: FirestoreService,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ){
    this.userCollection = afs.collection<User>('users');
  }

  getAll() {
    let users = this.afs.collection('users').valueChanges().pipe(
      map(action => action.map( (user: any) => {
        console.log(user)
        let role;
        this.afs.doc<Role>(user.role.path).get().subscribe(res => {
          console.log(res)
        })
        return {
          role ,
          ...user
        }
      }))
    );
    console.log(users )
    return users;
  }

  register(displayName, email, password) {
    return from(
      this.afa.auth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      tap(credential => {
       credential.user.updateProfile({ displayName, photoURL: "" });
      }),
      map(credential => credential.user),
      catchError(err => { throw err })
    );
  }
  
  add(user: User) {
    console.log(user)
    this.register(user.displayName, user.email, user.password);
    let newUser: AngularFirestoreCollection<User> = this.afs.collection('users');
    this.afs.collection('users').add({
      ...user,
      createdDate: new Date(),
      updatedDate: new Date(),
      signInMethod: "Regular Signin",
      role: this.afs.doc('roles/' + user.role.id).ref,
    }).then(res => {
      newUser = this.afs.collection('users', ref => ref.where('id', '==', res.id))
    });
    return newUser.valueChanges();
  }

  update(user: User) {
    this.userDoc = this.afs.doc<User>(`users/${user.uid}`);
    this.userDoc.set({...user});  
    return this.userDoc.valueChanges();
  }

  delete(id: string) {
    console.log(id)
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    this.userDoc.delete();
    this.userDoc.valueChanges().subscribe(e => console.log(e))
    return of(id);
  }
}
