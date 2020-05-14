import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth';
import { SpeechesModule } from './speeches';
import { UsersModule } from './users';
import { CoreModule } from './core';
import { AppLayoutComponent } from './core/containers';
import { AgmCoreModule } from '@agm/core';
import { StoreModule } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAnalyticsModule, UserTrackingService, ScreenTrackingService, DEBUG_MODE as ANALYTICS_DEBUG_MODE } from '@angular/fire/analytics';
import { AngularFireDatabaseModule, URL as DATABASE_URL } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule, ORIGIN as FUNCTIONS_ORIGIN } from '@angular/fire/functions';
import { AngularFireRemoteConfigModule, SETTINGS as REMOTE_CONFIG_SETTINGS } from '@angular/fire/remote-config';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
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
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, 
    AuthModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    CoreModule,
    SpeechesModule,
    UsersModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireRemoteConfigModule,
    AngularFirePerformanceModule,
    AngularFireAuthGuardModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx SPeech Script Store App',
    }),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppLayoutComponent,
  ],
  entryComponents: [],
  providers: [MatDatepickerModule, Actions,],
  bootstrap: [AppLayoutComponent]
})
export class AppModule { }
