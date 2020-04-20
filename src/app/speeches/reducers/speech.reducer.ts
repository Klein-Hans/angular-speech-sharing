import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { SpeechAction } from '../actions';
import { Speech } from '../models';

export const speechFeatureKey = 'speeches';

export interface State extends EntityState<Speech> {
  selectedSpeechId: string | null;
}

export const adapter: EntityAdapter<Speech> = createEntityAdapter<Speech>({
  selectId: (speech: Speech) => speech.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedSpeechId: null,
}); 

export const speechReducer = createReducer(
  initialState,
  on(SpeechAction.loadSpeeches, state => ({
    ...state,
    loading: true,
  })),
  on(SpeechAction.loadSpeechesSuccess, (state, { speeches }) => 
    adapter.addAll(speeches, state)
  ),
  // on(SpeechAction.loadSpeechesSuccess, (state, { speeches }) => ({
  //   ...state,
  //   loaded: true,
  //   loading: false,
  //   ids: speeches.map(speech => speech.id),
  // })),
);

export function reducer(state: State | undefined, action: Action) {
  return speechReducer(state, action);
}

export const getSelectedSpeechId = (state: State) => state.selectedSpeechId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectSpeechIds = selectIds;
 
export const selectSpeechEntities = selectEntities;
 
export const selectAllSpeeches = selectAll;
 
export const selectSpeechTotal = selectTotal;

// export const selectId = (state: State) => state.selectedSpeechId;