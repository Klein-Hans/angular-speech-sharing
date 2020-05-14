import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap, mergeMap } from 'rxjs/operators';
import {
  AuthActions,
  AuthApiActions,
  AuthPageActions,
} from '../actions';
import { User } from '../models';
import { AuthService } from '../services';
import { LogoutConfirmationDialogComponent } from '../components';
import { UserActions } from '../../core/actions';
import * as fromAuth from '../reducers/auth.reducer';
import { Store } from '@ngrx/store';

declare var $: any;

@Injectable()
export class AuthEffects {

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.register),
      switchMap(({credentials}) => 
        this.authService.register(credentials.displayName, credentials.email, credentials.password).pipe(
          tap(() => {
            let notifContent = {
              message: 'You have successfully register. Login with your newly created account',
              type: 'success',
            }
            this.showNotif(notifContent);
          }),
          map(() => AuthApiActions.loginRedirect()),
          catchError(err => {
            let notifContent = {
              message:  err.message,
              type: 'danger',
            }
            this.showNotif(notifContent);
            return of(AuthApiActions.registerFail({ error: err.message }))
          })
        ),
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.login),
      switchMap(({credentials}) => 
        this.authService.login(credentials.email, credentials.password).pipe(
          map((user: User) => AuthApiActions.loginSuccess({ user })),
          catchError(err => {
            let notifContent = {
              message:  err.message,
              type: 'danger',
            } 
            this.showNotif(notifContent);
            return of(AuthApiActions.loginFail({ error: err.message }))
          })
        )
      )
    )
  );

  facebookLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.facebookLogin),
      exhaustMap(() => 
        this.authService.facebookLogin().pipe(
          map((user: User) => AuthApiActions.loginSuccess({ user })),
          catchError(err =>
            of(AuthApiActions.loginFail({ error: err.message }))
          )
        )
      )
    )
  );

  githubLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.githubLogin),
      exhaustMap(() => 
        this.authService.githubLogin().pipe(
          map((user: User) => AuthApiActions.loginSuccess({ user })),
          catchError(err =>
            of(AuthApiActions.loginFail({ error: err.message }))
          )
        )
      )
    )
  );

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.googleLogin),
      exhaustMap(() => 
        this.authService.googleLogin().pipe(
          map((user: User) => AuthApiActions.loginSuccess({ user })),
          catchError(err =>
            of(AuthApiActions.loginFail({ error: err.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      tap(() => this.router.navigate(['/dashboard']))
    ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginRedirect, AuthActions.logout),
      map(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
        return true;
      })
    ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        let sidebar = document.getElementById('sidebar');
        sidebar ? sidebar.style.zIndex = "100 !important" : "";
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);
        return dialogRef.afterClosed();
      }),
      tap(() => {
        let sidebar = document.getElementById('sidebar');
        sidebar ? sidebar.style.zIndex = "1030 !important" : "";
      }),
      map(
        result =>
          result
            ? AuthActions.logout()
            : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

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
