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
  MatIconModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersRoutingModule } from './users-routing';
import { UserEffects, RoleEffects } from './effects';
import * as fromUsers from './reducers';
import { PipesModule } from '../core/pipes';
import { 
  UsersTableComponent, 
  UserCreateUpdateFormComponent,
} from './components';
import {
  DashboardComponent,
  CreateUpdateUserPageComponent,
  UserListPageComponent,
} from './containers';

export const COMPONENTS = [
  UsersTableComponent, 
  UserCreateUpdateFormComponent
];

export const CONTAINERS = [
  DashboardComponent,
  CreateUpdateUserPageComponent,
  UserListPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    UsersRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('users', fromUsers.reducers),
    EffectsModule.forFeature([UserEffects, RoleEffects]),
    PipesModule,
  ],
  providers: [ Actions ],
  declarations: [ COMPONENTS, CONTAINERS ],
  // entryComponents: [ PopUpDialogComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class UsersModule {}
