import { createAction } from '@ngrx/store';

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFail = createAction('[Auth] Logout Faile');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction('[Auth] Logout Confirmation Dismiss');
