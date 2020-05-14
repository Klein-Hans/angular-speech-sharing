import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { User, Role } from '../models';
import { UserPageAction, UserApiAction } from '../actions';
import * as fromUsers from '../../reducers';
import { Action, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { UserService } from '../services'
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class UserEffects {

  ngrxOnInitEffects(): Action {
    return { type: '[User Module] Load Users' };
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPageAction.loadUsers),
      switchMap(() => 
        this.userService.getAll().pipe(
          tap((users: User[]) => {
            console.log(users)
            this.store.dispatch(UserApiAction.getUsers({ users }))
          }),
          map((users: User[]) => {
            console.log(users)
            return UserApiAction.loadUsersSuccess({ users })
          }),
          catchError(err =>
            of(UserApiAction.loadUsersFail({ errorMsg: err.message }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserPageAction.addUser),
      mergeMap(({ user }) => 
        this.userService.add(user).pipe(
          tap(e => console.log(e)),
          map(() => UserApiAction.addUserSuccess({ user })),
          catchError(() => of(UserApiAction.addUserFail({ user })))
        )
      )
    )
  );

  updateUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserPageAction.updateUser),
      mergeMap(({ user }) => 
        this.userService.update(user).pipe(
          tap(user$ => {
            console.log(user$);
            const user: Update<User> = {
              id: user$.uid,
              changes: { ...user$ }
            }
            this.store.dispatch(UserApiAction.updateUser({ user }))
            const id = user$.uid;
          }),
          map(() => UserApiAction.updateUserSuccess({ user })),
          catchError(() => of(UserApiAction.updateUserFail({ user })))
        )
      )
    )
  );
  
  deleteUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserPageAction.deleteUser),
      mergeMap(({ user }) =>
        this.userService.delete(user.uid).pipe(
          tap(id => {
            this.store.dispatch(UserApiAction.deleteUser({ id }));
          }),
          map(() => UserApiAction.deleteUserSuccess({user})),
          catchError(() => of(UserApiAction.deleteUserFail({ user })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromUsers.State>
  ) {} 
}
