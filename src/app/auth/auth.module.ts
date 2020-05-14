import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import * as fromAuth from './reducers';
import { AuthRoutingModule } from './auth-routing';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { 
  SignInPageComponent, 
  SignUpPageComponent 
} from './containers';
import { 
  LogoutConfirmationDialogComponent, 
  LoginFormComponent, 
  SocialLoginComponent,
  RegisterFormComponent
} from './components';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

export const COMPONENTS = [
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
  SocialLoginComponent, 
  RegisterFormComponent
];

export const CONTAINERS = [
  SignInPageComponent,
  SignUpPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
    MatPasswordStrengthModule
  ],
  declarations: [ COMPONENTS, CONTAINERS ],
  entryComponents: [ LogoutConfirmationDialogComponent ],
})
export class AuthModule {}
