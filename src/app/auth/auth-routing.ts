import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent, SignUpPageComponent } from './containers';

const routes: Routes = [
  { 
    path: 'login', 
    component: SignInPageComponent, 
    data: { title: 'Login' } 
  },
  { 
    path: 'register', 
    component: SignUpPageComponent, 
    data: { title: 'Register' } 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
