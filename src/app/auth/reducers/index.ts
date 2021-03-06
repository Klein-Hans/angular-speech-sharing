import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';
// import * as fromRoot fr  om '../../core/reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  state => state.status
);

export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);

export const selectError = createSelector(
  selectAuthStatusState, 
  fromAuth.getError  
);

export const selectLoggedIn = createSelector(selectUser, user => !!user);

// export const selectLoginPageState = createSelector(
//   selectAuthState,
//   state => state.loginPage
// );
// export const selectLoginPageError = createSelector(
//   selectLoginPageState,
//   fromLoginPage.getError
// );
// export const selectLoginPagePending = createSelector(
//   selectLoginPageState,
//   fromLoginPage.getPending
// );
