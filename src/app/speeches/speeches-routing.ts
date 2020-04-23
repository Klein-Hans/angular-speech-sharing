import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent, SpeechAdminPageComponent, SpeechMemberPageComponent } from './containers';

// import { BookExistsGuard } from '@example-app/books/guards';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Find book' },
  },
  {
    path: 'speech-admin',
    component: SpeechAdminPageComponent,
    // canActivate: [BookExistsGuard],
    data: { title: 'Book details' },
  },
  {
    path: 'speech-member',
    component: SpeechMemberPageComponent,
    data: { title: 'Collection' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SpeechesRoutingModule {}
