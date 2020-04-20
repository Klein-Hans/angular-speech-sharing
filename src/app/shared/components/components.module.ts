import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    DialogInfoComponent,
  ],
  exports: [
    DialogInfoComponent
  ]
})
export class ComponentsModule { }
