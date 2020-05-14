import { Component, OnInit } from '@angular/core';
import { Role, User } from 'app/users/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRole from '../../reducers'; 
import { RolePageAction, UserPageAction } from 'app/users/actions';

declare var $: any;

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent implements OnInit {

  private roles$: Observable<Role[]>;

  constructor(
    private store: Store<fromRole.State>
  ) {
    this.roles$ = store.pipe(select(fromRole.selectAllRoles))
  }

  ngOnInit() {
    this.store.dispatch(RolePageAction.loadRoles());
  }

  onAddUser(user: User) {
    this.store.dispatch(UserPageAction.addUser({ user }));
    let notifContent = {
      message: 'New User has been Added Successfully',
      type: 'success',
    }
    this.showNotif(notifContent);
  }

  showNotif(content) {
    $.notify({
      icon: content.icon ? content.icon : 'notifications',
      message: content.message ? content.message : ''
    },{
      type: content.type ? content.type : 'success',
      timer: content.timer ? content.timer : '300',
      placement: content.placement ? content.placement : { from: 'top', align: 'center' },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    });
  }
}
