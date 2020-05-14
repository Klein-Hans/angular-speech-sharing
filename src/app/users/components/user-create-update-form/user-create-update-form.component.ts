import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Role, User } from 'app/users/models';
import { AuthFormValidators } from 'app/auth/validators/auth-form-validators';


@Component({
  selector: 'user-create-update-form',
  templateUrl: './user-create-update-form.component.html',
  styleUrls: ['./user-create-update-form.component.scss']
})
export class UserCreateUpdateFormComponent implements OnInit {

  hide: boolean = false;
  createUpdateUserForm: FormGroup;
  @Input() roles: Role[];
  @Output() addUser = new EventEmitter<User>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createUpdateUserForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        AuthFormValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        AuthFormValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        AuthFormValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        AuthFormValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8)
      ]],
      phoneNumber: [''],
      role: ['', Validators.required],
    });
  }

  get name() {
    return this.createUpdateUserForm.get('displayName');
  }

  get email() {
    return this.createUpdateUserForm.get('email');
  }

  get password() {
    return this.createUpdateUserForm.get('password');
  }

  get phoneNumber() {
    return this.createUpdateUserForm.get('phoneNumber');
  }

  get role() {
    return this.createUpdateUserForm.get('role');
  }

  onAddUser() {
    this.addUser.emit(this.createUpdateUserForm.value);
    this.createUpdateUserForm.reset();
  }

  password_generator(len) {
    let length = (len)?(len):(10);
    let string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    let numeric = '0123456789';
    let punctuation = '@$^&_-';
    let password = "";
    let character = "";
    let crunch = true;
    let entity1;
    let entity2;
    let entity3;
    let hold;

    while( password.length < length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (password.length %2==0 ) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password = password.split('').sort(function(){return 0.5-Math.random()}).join('');

    this.password.setValue(password.substr(0,len));
    // return password.substr(0,len);
  }
} 



