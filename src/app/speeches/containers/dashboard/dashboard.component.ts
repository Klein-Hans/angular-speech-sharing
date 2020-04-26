import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router"
import { PopUpDialogComponent } from '../../components/pop-up-dialog/pop-up-dialog.component';
import { Store } from '@ngrx/store';
import * as fromSpeeches from '../../reducers';
import { SpeechPageAction } from '../../actions';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
    await this.store.dispatch(SpeechPageAction.loadSpeeches());
    this.router.navigate(['/speech-admin'])
  }
}

