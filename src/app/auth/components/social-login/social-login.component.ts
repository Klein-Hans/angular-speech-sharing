import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  @Output() facebookLogin = new EventEmitter<any>();
  @Output() githubLogin = new EventEmitter<any>();
  @Output() googleLogin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onFacebookLogin() {
    this.facebookLogin.emit();
  }

  onGithubLogin() {
    this.githubLogin.emit();
  }

  onGoogleLogin() {
    this.googleLogin.emit();
  }

}
