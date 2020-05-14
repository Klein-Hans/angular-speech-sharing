import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { User } from '../models';
import { AngularFireAuth } from '@angular/fire/auth/';
import { auth} from 'firebase/app';
import { map, tap, catchError } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.userCollection = this.afs.collection<User>('users');
    this.users = this.userCollection.valueChanges();
  }  
  
  register(displayName, email, password) {
    // const credential = firebase.auth.EmailAuthProvider.credential( email, password );
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

  login(email, password) {
    console.log(email, password)
    return from(
      this.afa.auth.signInWithEmailAndPassword(email, password)
    ).pipe(
      map(credential => {
        let user = {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          phoneNumber: credential.user.phoneNumber,
          photoURL: credential.user.photoURL,
          signInMethod: "Regular Signin",
          createdDate: new Date(),
          updatedDate: new Date(),
        }
        let dbUser = this.afs.collection('user', ref => ref.where('id', '==', credential.user.uid))
        dbUser.valueChanges().subscribe(e => {
          console.log(e)
          if(e === undefined || e.length == 0){
            this.addUser(user);
          }
        });
        return user;
      }),
      catchError(err => { throw err })
    );
  }

  facebookLogin() {
    return from(this.afa.auth.signInWithPopup(
      new auth.FacebookAuthProvider()
    )).pipe(
      map(credential => {
        let user = {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          phoneNumber: credential.user.phoneNumber,
          photoURL: credential.user.photoURL,
          signInMethod: "Facebook",
          createdDate: new Date(),
          updatedDate: new Date(),
        }
        
        this.afs.collection('user', ref => ref.where('id', '==', credential.user.uid))
        .valueChanges().subscribe(e => {
          console.log(e)
          if(e === undefined || e.length == 0){
            this.addUser(user);
          }
        });
        return user;
      }),
      catchError((err, obs) => { 
        console.error('Facebook Login failed. Error: ', err);
        return obs;
      })
    );
  }

  githubLogin() {
    return from(this.afa.auth.signInWithPopup(
      new auth.GithubAuthProvider()
    )).pipe(
      map(credential => {
        let user = {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          phoneNumber: credential.user.phoneNumber,
          photoURL: credential.user.photoURL,
          signInMethod: "Github",
          createdDate: new Date(),
          updatedDate: new Date(),
        }
        this.afs.collection('user', ref => ref.where('id', '==', credential.user.uid))
        .valueChanges().subscribe(e => {
          console.log(e)
          if(e === undefined || e.length == 0){
            this.addUser(user);
          }
        });
        return user;
      }),
      catchError((err, obs) => { 
        console.error('Github Login failed. Error: ', err);
        return obs;
      })
    );
  }

  googleLogin() {
    return from(this.afa.auth.signInWithPopup(
      new auth.GoogleAuthProvider()
    )).pipe(
      map(credential => {
        let user = {
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName,
          phoneNumber: credential.user.phoneNumber,
          photoURL: credential.user.photoURL,
          signInMethod: "Google",
          createdDate: new Date(),
          updatedDate: new Date(),
        }
        
        this.afs.collection('user', ref => ref.where('id', '==', credential.user.uid))
        .valueChanges().subscribe(e => {
          console.log(e)
          if(e === undefined || e.length == 0){
            this.addUser(user);
          }
        });

        return user;
      }),
      catchError((err, obs) => { 
        console.error('Google Login failed. Error: ', err);
        return obs;
      })
    );
  }
  
  logout() {
    this.afa.auth.signOut();  
  }

  addUser(user) {
    console.log(user);
    let id = user.uid;
    this.afs.collection<User>('users').doc(id).set({...user});
  }
  
}
