import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Speech } from 'app/speeches/models';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'nav-tab-table',
  template: `
  <div class="card">
    <div class="card-header card-header-tabs card-header-primary">
        <div class="nav-tabs-navigation">
            <div class="nav-tabs-wrapper">
                <ul class="nav nav-tabs" data-tabs="tabs">
                    <li class="nav-item">
                        <a mat-button class="nav-link active" href="#profile" data-toggle="tab">
                            <i class="material-icons">description</i> View my Speeches
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a mat-button class="nav-link" href="#messages" data-toggle="tab">
                            <i class="material-icons">note_add</i> Submit a new Speech
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a mat-button class="nav-link" href="#settings" data-toggle="tab">
                            <i class="material-icons">find_in_page</i> Search all Speeches
                            <div class="ripple-container"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="card-body">
      <div class="tab-content">
        <div class="tab-pane active" id="profile">
          <div class="row">
            <div class="col-lg-3">
              <div class="card p-2">
                <button
                  *ngFor="let speech of speeches; index as i"
                  (click)="onSelectSpeech(speech.id)"
                  mat-button 
                  class="text-left btn btn-block"
                  [ngClass]="{'btn-primary': speech.id == selectedSpeechId}">
                    Speech {{ i + 1 }}
                    <i *ngIf="speech.id == selectedSpeechId" class="material-icons">play_arrow</i>
                </button>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="card p-2">
                <form [formGroup]="selectedSpeechForm" (ngSubmit)="onSubmit()">
                  <mat-form-field>
                    <textarea
                      formControlName="content"
                      matInput 
                      rows="5" 
                      cols="40"
                      placeholder="Speech Content shown here"></textarea>
                  </mat-form-field> 
                  <div class="row">
                    <div class="col-lg-3">
                      <mat-form-field>
                        <input formControlName="author" matInput type="text" placeholder="Author">
                      </mat-form-field>
                    </div>
                    <div class="col-lg-5">
                      <mat-form-field>
                        <input formControlName="subject" matInput type="text" placeholder="Subject Area Keywords">
                      </mat-form-field>
                    </div>
                    <div class="col-lg-4">
                      <mat-form-field>
                        <mat-label>Speech Date</mat-label>
                        <input
                          formControlName="publishedDate"
                          matInput 
                          [matDatepicker]="picker">
                        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                        <mat-datepicker #picker></mat-datepicker>
                      </mat-form-field>
                    </div>
                    <div class="col-lg-12 d-flex justify-content-end">
                      <button mat-button class="text-left btn btn-danger">
                        <i class="material-icons">delete</i>
                        Delete
                      </button>
                      <button 
                        (onClick)="onSave()"
                        mat-button class="text-left btn btn-primary ml-2">
                        <i class="material-icons">save</i>
                        Save
                      </button>
                      <button mat-button class="text-left btn btn-info ml-2">
                        <i class="material-icons">share</i>
                        Share
                      </button>
                    </div> <!-- end of col -->
                  </div>
                </form>
              </div>
            </div> <!-- end of col -->
          </div> <!-- end of row -->
        </div> <!-- end of tab-pane -->
        <div class="tab-pane" id="messages">
          <form [formGroup]="addSpeechForm" (ngSubmit)="onAddSpeech($event)">
            <mat-form-field>
              <input matInput formControlName="subject" type="text" placeholder="Subject Area Keywords">
            </mat-form-field>
            <mat-form-field>
              <textarea 
                matInput 
                formControlName="content"
                rows="5" 
                cols="40" 
                placeholder="Speech Content"></textarea>
            </mat-form-field>
            <button mat-button class="btn btn-primary float-right">
              <i class="material-icons">save</i>
              Save
            </button>
          </form>
        </div> <!-- end of tab-pane -->
        <div class="tab-pane" id="settings">
          <table class="table">
            <thead class=" text-primary">
              <th>
                  ID
              </th>
              <th>
                  Author
              </th>
              <th>
                  Subject
              </th>
              <th>
                  Content
              </th>
              <th>
                  Action
              </th>
            </thead>
            <tbody>
              <tr *ngFor="let speech of speeches">
                <td>{{ speech.id }}</td>
                <td>{{ speech.author }}</td>
                <td>
                  {{ ( speech.subject.length > 16 ) ? ( speech.subject | slice: 0:16 ) + '...' : ( speech.subject ) }}
                </td>
                <td>
                  {{ ( speech.content.length > 25 ) ? ( speech.content | slice: 0:25 ) + '...' : ( speech.content ) }}
                </td>
                <td>
                  <button mat-raised-button type="button" matTooltip="View Details" [matTooltipPosition]="'above'" class="btn btn-info btn-link btn-sm btn-just-icon">
                    <i class="material-icons">visibility</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> <!-- end of card-body -->
  </div> <!-- end of card -->
  `,
  styles: [``]
})
export class NavTabTableComponent implements OnInit{

  @Input() speeches!: Speech[];
  @Input() selectedSpeechId!: string;
  @Input() selectedSpeech!: Speech;
  @Input() selectedSpeechForm: FormGroup;
  @Input() addSpeechForm: FormGroup;
  @Output() selectSpeech = new EventEmitter<string>();
  @Output() add = new EventEmitter<Speech>();
  @Output() update = new EventEmitter<Speech>();
  @Output() remove = new EventEmitter<Speech>();

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    console.log(this.selectedSpeechForm)
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
}
