import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router"
import { PopUpDialogComponent } from '../../components/pop-up-dialog/pop-up-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  groupId: String;
  isLogin: boolean = true;
  // @ViewChild('joinGroupDialog', {static: false}) joinGroupDialog: any;

  constructor(
    public dialog: MatDialog,
    private router: Router
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
      this.groupId ? this.router.navigate(['/speech-list']) : '';
      console.log(res, "Test");
    });
  }

  onEnterGroupID() {
    this.router.navigate(['/speech-list'])
  }
}

