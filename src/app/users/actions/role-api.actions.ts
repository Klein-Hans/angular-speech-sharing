import { createAction, props } from '@ngrx/store';
import { Role } from '../models';

export const getRoles = createAction(
  '[Roles/API] Load Roles',
  props<{ roles: Role[] }>()
);

export const loadRolesSuccess = createAction(
  '[Roles/API] Load Roles Success',
  props<{ roles: Role[] }> ()
);

export const loadRolesFail = createAction(
  '[Roles/API] Load Roles Fail',
  props<{ errorMsg: string }>()
);
