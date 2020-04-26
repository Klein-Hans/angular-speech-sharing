import { Component, OnInit, Input } from '@angular/core';
import { Speech } from '../../models';

@Component({
  selector: 'speech-table',
  templateUrl: './speech-table.component.html',
  styleUrls: ['./speech-table.component.scss']
})
export class SpeechTableComponent implements OnInit {

  @Input() speeches: Speech[];

  constructor() { }

  ngOnInit() {
  }
}
