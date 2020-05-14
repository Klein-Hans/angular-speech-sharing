import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { UserPageAction, UserApiAction } from '../actions';
import { User } from '../models';
import { state } from '@angular/animations';

export const userFeatureKey = 'users';

export interface State extends EntityState<User> {
  selectedUserId: string | null;
  error: string | null,
  loading: boolean,
  ids: string[],
}

export function sortByUpdatedDate(a: User, b: User): any {
  return a.updatedDate - b.updatedDate;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.uid,
  sortComparer: sortByUpdatedDate,
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  error: null,
  loading: false,
  ids: [],
}); 

export const reducer = createReducer(
  initialState,

  /**
   * Loading Reducers 
   */ 
  on(UserPageAction.loadUsers, state => ({
    ...state,
    loading: true,
  })),
  on(UserApiAction.getUsers, (state, { users }) => 
    adapter.addAll(users, state)
  ),
  on(UserApiAction.loadUsersSuccess, state => ({
    ...state,
    loaded: true,
    loading: false,
  })),

  /**
   * Select User Reducer
   */
  on(UserPageAction.selectUser, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  })),


  /**
   * Add User Reducers
   */
  on(UserApiAction.addUser, (state, { user }) => 
    adapter.addOne(user, state)
  ),
  // on(UserApiAction.addUserSuccess, (state, { user }) => {
  //   if (state.ids.indexOf(user.id) > -1) {
  //     return state;
  //   }
  //   return {
  //     ...state,
  //     ids: [...state.ids, user.id],
  //   };
  // }),
  // on(UserApiAction.addUserFail, (state, { user }) => ({
  //     ...state,
  //     ids: state.ids.filter(id => id !== user.id),
  //   })
  // ),

  /**
   * Update User Reducers
   */
  on(UserApiAction.updateUser, (state, { user }) => 
    adapter.updateOne(user, state)
  ),
  on(UserApiAction.updateUserSuccess, (state, { user }) => ({
    ...state,
    selectedUserId: user.uid
  })),

  /**
   * Delete User Reducers
   */
  on(UserApiAction.deleteUser, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  // on(UserApiAction.deleteUserSuccess, (state, { user }) => ({
  //     ...state,
  //     ids: state.ids.filter(id => id !== user.id),
  //   })
  // ),
  // on(UserApiAction.deleteUserFail,
  //   (state, { user }) => {
  //     if (state.ids.indexOf(user.id) > -1) {
  //       return state;
  //     }
  //     return {
  //       ...state,
  //       ids: [...state.ids, user.id],
  //     }
  //   }
  // ),
);

export const getSelectedUserId = (state: State) => state.selectedUserId;