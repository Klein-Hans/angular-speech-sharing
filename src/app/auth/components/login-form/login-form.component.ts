import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'app/auth/models';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hide: boolean = true;
  signInForm: FormGroup;
  @Input() error: string;
  @Output() login = new EventEmitter<User>();

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.error ? this.signInForm.reset() : "";
  }

  onLogin() {
    this.login.emit(this.signInForm.value);
  }

}
