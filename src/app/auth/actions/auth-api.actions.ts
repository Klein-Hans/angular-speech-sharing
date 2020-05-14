import { props, createAction } from '@ngrx/store';
import { User } from '../models';

export const getUser = createAction(
  '[Auth Page] Get User'
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginFail = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success'
);

export const registerFail = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const loginRedirect = createAction(
  '[Auth/API] Login Redirect'
);