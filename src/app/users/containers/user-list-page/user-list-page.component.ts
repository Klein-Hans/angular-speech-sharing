import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models'
import * as fromUsers from '../../reducers';
import { Store, select } from '@ngrx/store';
import { UserPageAction } from 'app/users/actions';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {

  private users$: Observable<User[]>;
  private selectedUser$: Observable<User>;
  private selectedUserId$: Observable<string>;
  private newUserToastNotif$: Observable<object>;

  constructor(
    private store: Store<fromUsers.State>
  ) { 
    this.users$ = store.pipe(select(fromUsers.selectAllUsers));
    this.selectedUser$ = store.pipe(select(fromUsers.selectSelectedUser));
    this.selectedUserId$ = store.pipe(select(fromUsers.selectSelectedUserId));
  }

  ngOnInit() {
    this.store.dispatch(UserPageAction.loadUsers());
  }
}
