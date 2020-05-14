import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthActions, AuthPageActions } from '../actions';
import { User } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  
  on(AuthPageActions.login, state => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(AuthPageActions.facebookLogin, state => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(AuthPageActions.githubLogin, state => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(AuthPageActions.googleLogin, state => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(AuthApiActions.getUser, state => ({ 
    ...state,
    loading: false
  })),
  
  on(AuthApiActions.loginSuccess, state => ({ 
    ...state,
    loading: false
  })),

  on(AuthApiActions.loginFail, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  })),

  on(AuthPageActions.register, state => ({ 
    ...state,
    loading: true
  })),

  on(AuthApiActions.registerSuccess, state => ({ 
    ...state,
    loading: false
  })),

  on(AuthApiActions.registerFail, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  })),

  on(AuthActions.logout, () => initialState),
);

export const getUser = (state: State) => state.user;
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;