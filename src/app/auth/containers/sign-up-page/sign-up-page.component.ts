import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { AuthPageActions } from '../../actions';
import { User } from '../../models';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  password: string;
  error$: Observable<string>;
  
  constructor(
    private store: Store<fromAuth.State>,
    private router: Router,
    private authService: AuthService
    ) { 
      this.error$ = store.pipe(select(fromAuth.selectError));
    }
      
  ngOnInit() {
    
  }

  onRegister(credentials: User){
    this.store.dispatch(AuthPageActions.register({credentials}));
    // this.authService.addUser(user);
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

  onPasswordChange(e) {
    console.log(e)
  }

  onSuccess(e) {
    console.log("Success", e)
  }

  onNavigateLogin() { 
    this.router.navigate(['/login'])
  }
}
