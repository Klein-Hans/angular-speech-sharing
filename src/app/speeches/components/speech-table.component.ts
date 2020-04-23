import { Component, OnInit, Input } from '@angular/core';
import { Speech } from '../models';

@Component({
  selector: 'speech-table',
  template: `
  <div class="card">
    <div class="card-header card-header-primary">
      <h4 class="card-title ">Speeches Table</h4>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead class=" text-primary">
            <th> ID </th>
            <th> Author </th>
            <th> Subject </th>
            <th> Content </th>
            <th> Action </th>
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
  </div>
  `,
  styles: [``]
})
export class SpeechTableComponent implements OnInit {

  @Input() speeches: Speech[];

  constructor() { }

  ngOnInit() {
  }
}
