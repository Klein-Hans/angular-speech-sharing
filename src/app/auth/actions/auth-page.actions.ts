import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const authenticated = createAction(
  '[Auth Page] Authenticated',
  props<{ payload?: any }>()
);

export const notAuthenticated = createAction(
  '[Auth Page] Not Authenticated',
  props<{ payload?: any }>()
);

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: User }>()
);

export const googleLogin = createAction(
  '[Auth Page] Google Login'
);

export const githubLogin = createAction(
  '[Auth Page] Github Login'
);

export const facebookLogin = createAction(
  '[Auth Page] Facebook Login'
);

export const register = createAction(
  '[Register Page] Register',
  props<{ credentials: User }>()
);
