import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  DashboardComponent, 
  AddEditUserPageComponent, 
  UserListPageComponent, 
} from './containers';

// import { BookExistsGuard } from '@example-app/books/guards';

export const routes: Routes = [
  {
    path: 'users/dashboard',
    component: DashboardComponent,
    data: { title: 'dashboard' },
  },
  {
    path: 'users/',
    component: UserListPageComponent,
    // canActivate: [BookExistsGuard],
    data: { title: 'Users Collection' },
  },
  {
    path: 'users/create',
    component: AddEditUserPageComponent,
    data: { title: 'Create User' },
  },
  {
    path: 'users/:id/edit',
    component: AddEditUserPageComponent,
    data: { title: 'Update User' },
  },
  {
    path: 'users/:id',
    component: AddEditUserPageComponent,
    data: { title: 'User Details' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UsersRoutingModule {}
