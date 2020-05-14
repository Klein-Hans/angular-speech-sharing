import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent, SpeechAdminPageComponent, SpeechMemberPageComponent } from './containers';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

// import { BookExistsGuard } from '@example-app/books/guards';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { title: 'Dashboard', authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'speech-admin',
    component: SpeechAdminPageComponent,
    data: { title: 'Book details' },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'speech-member',
    component: SpeechMemberPageComponent,
    data: { title: 'Collection' },
    canActivate: [AngularFireAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SpeechesRoutingModule {}
