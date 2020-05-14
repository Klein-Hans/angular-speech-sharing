import { User } from '../models';
import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromRole from './role.reducer';
import * as fromRoot from '../../reducers';

export const usersFeatureKey = 'users';

export interface UsersState {
  [fromUser.userFeatureKey]: fromUser.State;
  [fromRole.roleFeatureKey]: fromRole.State;
  //...
}

export interface State extends fromRoot.State {
  [usersFeatureKey]: UsersState
  // [fromSearch.searchFeatureKey]: fromSearch.State;
  // [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export function reducers(state: UsersState | undefined, action: Action) {
  return combineReducers({
    [fromUser.userFeatureKey]: fromUser.reducer,
    [fromRole.roleFeatureKey]: fromRole.reducer,
    // [fromSearch.searchFeatureKey]: fromSearch.reducer,
    // [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

/**
 * Users
 */
export const selectUsersState = createFeatureSelector<State, UsersState>(
  usersFeatureKey,
);

export const selectUserState = createSelector(
  selectUsersState,
  state => state.users
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  fromUser.getSelectedUserId
);

export const {
  selectIds: selectIds,
  selectEntities: selectUsersEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = fromUser.adapter.getSelectors(selectUserState);

export const selectSelectedUser = createSelector(
  selectUsersEntities,
  selectSelectedUserId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);


/**
 * Roles
 */
export const selectRolesState = createSelector(
  selectUsersState,
  state => state.roles
);

export const {
  selectAll: selectAllRoles,
} = fromRole.adapter.getSelectors(selectRolesState);