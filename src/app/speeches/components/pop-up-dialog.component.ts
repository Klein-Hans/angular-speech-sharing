import { Component, OnInit, Inject } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-dialog',
  template: `
  <div>
    <button class="close d-block" mat-button (click)="onClose()">
      <i class="material-icons">close</i>
    </button>
    <h1 mat-dialog-title>Enter Group ID</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Group ID</mat-label>
        <input matInput [(ngModel)]="data.groupId">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button
        (click)="onEnterGroupID()"
        mat-raised-button 
        class="btn btn-info float-right btn-block" 
        [mat-dialog-close]="groupId" 
        cdkFocusInitial>
        Ok
      </button>
    </div>
  </div>
`,
  styles: [`
    .close.mat-button {
      position: relative;
      top: -1em;
      right: -1.01em;
      min-width: 1.8em;
    }    
  `]
})
export class PopUpDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onEnterGroupID(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
  
  }

}