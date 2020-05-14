import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SpeechesRoutingModule } from './speeches-routing';
import { 
  NavTabTableComponent, 
  PopUpDialogComponent, 
  SpeechTableComponent,
  SpeechDetailComponent,
} from './components';
import {
  DashboardComponent,
  SpeechAdminPageComponent,
  SpeechMemberPageComponent,
} from './containers';
import * as fromSpeeches from './reducers';
import { SpeechEffects } from './effects';
import { PipesModule } from '../core/pipes';
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
  NavTabTableComponent,
  PopUpDialogComponent,
  SpeechTableComponent,
  SpeechDetailComponent,
];

export const CONTAINERS = [
  DashboardComponent,
  SpeechAdminPageComponent,
  SpeechMemberPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SpeechesRoutingModule,
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
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('speeches', fromSpeeches.reducers),
    EffectsModule.forFeature([SpeechEffects]),
    PipesModule,
  ],
  providers: [ Actions ],
  declarations: [ COMPONENTS, CONTAINERS ],
  entryComponents: [ PopUpDialogComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SpeechesModule {}
