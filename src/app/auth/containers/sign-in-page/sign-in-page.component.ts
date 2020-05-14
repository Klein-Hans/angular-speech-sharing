import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { AuthPageActions } from '../../actions';
import { User } from 'app/auth/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  isSignIn: boolean = true;
  error$: Observable<string>;

  constructor(
    private store: Store<fromAuth.State>,
    private router: Router
  ) {
    this.error$ = store.pipe(select(fromAuth.selectError));
  }

  ngOnInit() {
  }

  onFacebookLogin(){
    this.store.dispatch(AuthPageActions.facebookLogin());
  }

  onGithubLogin(){
    this.store.dispatch(AuthPageActions.githubLogin());
  }

  onGoogleLogin(){
    this.store.dispatch(AuthPageActions.googleLogin());
  }

  onLogin(credentials: User) {
    this.store.dispatch(AuthPageActions.login({credentials}));
  } 

  onNavigateRegister() {
    this.router.navigate(['/register']);
  }
}
