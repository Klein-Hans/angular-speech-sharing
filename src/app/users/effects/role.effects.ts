import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import * as fromRoles from '../../reducers';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';

import { Role } from '../models';
import { RolePageAction, RoleApiAction } from '../actions';
import { RoleService } from '../services'
import { Action, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

@Injectable()
export class RoleEffects {

  ngrxOnInitEffects(): Action {
    return { type: '[Role Module] Load Roles' };
  }

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolePageAction.loadRoles),
      switchMap(() => 
        this.roleService.getAll().pipe(
          tap((roles: Role[]) => {
            this.store.dispatch(RoleApiAction.getRoles({ roles }))
          }),
          map((roles: Role[]) => 
            RoleApiAction.loadRolesSuccess({ roles }),
          ),
          catchError(err =>
            of(RoleApiAction.loadRolesFail({ errorMsg: err.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
    private store: Store<fromRoles.State>
  ) {} 
}
