import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { LoginPageComponent } from './containers';
import {
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
} from './components';

import { AuthEffects } from './effects';
import * as fromAuth from './reducers';
import { AuthRoutingModule } from './auth-routing.module';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
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
  MatCardModule
} from '@angular/material';

export const COMPONENTS = [
  // LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
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
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
    MatPasswordStrengthModule
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {}
