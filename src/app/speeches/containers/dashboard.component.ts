import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router"
import { PopUpDialogComponent } from '../components/pop-up-dialog.component';
import { Store } from '@ngrx/store';
import * as fromSpeeches from '../reducers';
import { SpeechAction } from '../actions';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="wrapper">
    <div class="container mx-auto mt-2 w-50">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1 class="">
            <i class="material-icons app-logo text-primary">share</i>
            Speech Sharing
          </h1>
          <p class="text-default font-italic">
            Powered by Angular
            <img src="/assets/img/angular2-logo-red.png" class="logo">
          </p>
        </div> <!-- end of col -->
      </div> <!-- end of row -->
      <div>
        <div class="row mt-5">
          <div class="col-lg-6">
            <a 
              mat-raised-button 
              class="btn btn-primary btn-lg mx-auto d-block btn-block"
              (click)="onEnterGroupID()">
              <i class="material-icons">add_circle</i>
              Create a Group
            </a>
          </div> <!-- end of col -->
          <div class="col-lg-6">
            <button 
              (click)="showJoinGroupDialog()" 
              mat-raised-button 
              class="btn btn-info btn-lg mx-auto d-block btn-block">
              <i class="material-icons">people_alt</i>
              Join a Group
            </button>
          </div> <!-- end of col -->
        </div> <!-- end of row -->
      </div>
    </div>
  </div>`,
  styles: [`
    .app-logo {
      font-size: 54px;
      position: relative;
      bottom: -0.2em;
    }

    .logo{
        width: 2em;
    }

    .btn .material-icons {
        font-size: 3em;
    }
  `],
})

export class DashboardComponent implements OnInit {

  groupId: string;
  isLogin: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store<fromSpeeches.State>
  ) { }

  ngOnInit() {
    
  }

  showJoinGroupDialog(): void {
    const dialogRef = this.dialog.open(PopUpDialogComponent, {
      width: '250px',
      data: { groupId: this.groupId }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.groupId = res.groupId;
      this.groupId ? this.router.navigate(['/speech-member']) : '';
    });
  }

  async onEnterGroupID() {
    await this.store.dispatch(SpeechAction.loadSpeeches());
    this.router.navigate(['/speech-admin'])
  }
}

