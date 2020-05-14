import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  DashboardComponent, 
  CreateUpdateUserPageComponent, 
  UserListPageComponent, 
} from './containers';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

// import { BookExistsGuard } from '@example-app/books/guards';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListPageComponent,
    data: { title: 'Users Collection' },
    canActivate: [AngularFireAuthGuard]
  },
  // {
  //   path: 'users-dashboard',
  //   component: DashboardComponent,
  //   data: { title: 'dashboard' }, 
  //   canActivate: [AngularFireAuthGuard]
  // },
  {
    path: 'users/create',
    component: CreateUpdateUserPageComponent,
    data: { title: 'Create User' },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'users/:id/edit',
    component: CreateUpdateUserPageComponent,
    data: { title: 'Update User' },
    canActivate: [AngularFireAuthGuard]
  },
  // {
  //   path: 'users/:id',
  //   component: AddEditUserPageComponent,
  //   data: { title: 'User Details' },
  //   canActivate: [AngularFireAuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UsersRoutingModule {}
