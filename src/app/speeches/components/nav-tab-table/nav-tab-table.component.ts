import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, Inject } from '@angular/core';
import { Speech } from 'app/speeches/models';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'nav-tab-table',
  templateUrl: './nav-tab-table.component.html',
  styleUrls: ['./nav-tab-table.component.scss']
})
export class NavTabTableComponent implements OnInit{

  @ViewChild("speechDetailDialog", { static: true }) speechDetailDialog: TemplateRef<any>;
  @Input() speeches!: Speech[];
  @Input() selectedSpeechId!: string;
  @Input() selectedSpeech!: Speech;
  @Input() selectedSpeechForm: FormGroup;
  @Input() newSpeechForm: FormGroup;
  @Output() selectSpeech = new EventEmitter<string>();
  @Output() addSpeech = new EventEmitter<Speech>();
  @Output() updateSpeech = new EventEmitter<Speech>();
  @Output() removeSpeech = new EventEmitter<Speech>();
  speechQuery: string;
  
  constructor(
    // public dialogRef: MatDialogRef<TemplateRef<any>>,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {    
  }

  onEnterSpeech(e) {
    e.preventDefault();
  }

  onSelectSpeech(id: string) {
    this.selectSpeech.emit(id);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.selectedSpeechForm.value);
  }

  onSave() {
    console.log(this.selectedSpeechForm.value);
  }

  onAddSpeech(e) {
    this.addSpeech.emit(this.newSpeechForm.value);
  }

  onUpdateSpeech(e) {
    this.updateSpeech.emit(this.selectedSpeechForm.value);
  }

  onDeleteSpeech(e) {
    this.removeSpeech.emit(this.selectedSpeechForm.value);
  }

  onSpeechDetails(speech){
    let dialogRef = this.dialog.open(this.speechDetailDialog, { data: { ...speech } });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    });
  }

  // onClose(): void {
  //   this.dialogRef.close();
  // }
}
