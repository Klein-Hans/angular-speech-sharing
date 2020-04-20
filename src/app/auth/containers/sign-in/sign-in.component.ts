import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isSignIn: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onSignIn() {
    this.isSignIn = true;
  }

  onSignUp() {
    this.isSignIn = false;
  }

  onLogIn() {
    
  } 

  onRegister() {
    
  }
}
