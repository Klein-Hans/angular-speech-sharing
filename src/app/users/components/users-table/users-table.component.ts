import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/users/models';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input() users: User[];
  searchQuery: string;

  constructor() { }

  ngOnInit() { }
  
}
