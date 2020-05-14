import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { User } from '../../models';
import { AuthFormValidators } from '../../validators/auth-form-validators';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  hide: boolean = true;
  isFormHasNoError: boolean = true;
  signUpForm: FormGroup;
  @Input() error: string;
  @Output() register = new EventEmitter<User>();
  
  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email 
      ]],
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
      confirmPassword: ['', Validators.required],
    },
    {
      validator: AuthFormValidators.passwordMatchValidator
    });
  }

  get name(){
    return this.signUpForm.get('displayName');
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.error ? this.signUpForm.reset() : "";
  }

  onRegister() {
    Object.keys(this.signUpForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.signUpForm.get(key).errors;
      this.isFormHasNoError = controlErrors ? false : true;
    }); 
    
    if(this.isFormHasNoError)
      this.register.emit(this.signUpForm.value);

  }
}
