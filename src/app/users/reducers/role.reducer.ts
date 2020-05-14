import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { RoleApiAction, RolePageAction } from '../actions';
import { Role } from '../models';
import { state } from '@angular/animations';

export const roleFeatureKey = 'roles';

export interface State extends EntityState<Role> {
  selectedRoleId: string | null;
  error: string | null,
  loading: boolean,
  ids: string[],
}

export const adapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  selectId: (role: Role) => role.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedRoleId: null,
  error: null,
  loading: false,
  ids: [],
}); 

export const reducer = createReducer(
  initialState,

  /**
   * Loading Reducers 
   */ 
  on(RolePageAction.loadRoles, state => ({
    ...state,
    loading: true,
  })),
  on(RoleApiAction.getRoles, (state, { roles }) => 
    adapter.addAll(roles, state)
  ),
  on(RoleApiAction.loadRolesSuccess, state => ({
    ...state,
    loaded: true,
    loading: false,
  })),
);

export const getSelectedRoleId = (state: State) => state.selectedRoleId;