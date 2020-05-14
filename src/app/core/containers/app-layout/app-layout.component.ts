import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as fromAuth from 'app/auth/reducers';
import { AuthActions } from 'app/auth/actions';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { User } from 'app/auth/models';

declare const $: any;

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  isOnDashboard: boolean;
  isNotAuthenticated: boolean;
  displayName$: Observable<string>;
  isAdminEmail: boolean;
  user: User;
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileMenu();
  }
  
  constructor(
    private store: Store<fromAuth.State>,
    private router: Router
  ) { 
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.isOnDashboard = val.url == '/dashboard' ? false : true;
        this.isNotAuthenticated = val.url == '/register' || val.url == '/login' ? false : true;
      }
    });
  }

  ngOnInit() { 
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      this.user = user;
      this.displayName$ = user ? of(this.user.displayName) : null;
      this.isAdminEmail = user.email == "escutonklein@gmail.com" ? true : false;
    });
  }

  ngOnDestroy(): void {
    // this.displayName$.unsubscribe();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  }

  onLogout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
    document.getElementById('sidebar').style.zIndex = "100 !important";
  }
}
