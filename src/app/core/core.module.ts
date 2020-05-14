import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
} from './components';
import {
  NotFoundComponent,
} from './containers';

export const COMPONENTS = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
];

export const CONTAINERS = [
  NotFoundComponent,
];

@NgModule({
  imports: [ 
    CommonModule, 
    RouterModule
  ],
  declarations: [ COMPONENTS, CONTAINERS ],
  exports: COMPONENTS,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CoreModule {}
