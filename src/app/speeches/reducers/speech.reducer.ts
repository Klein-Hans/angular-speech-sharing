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

export const reducer = createReducer(
  initialState,
  on(SpeechAction.loadSpeeches, state => ({
    ...state,
    loading: true,
  })),
  on(SpeechAction.loadSpeechesSuccess, (state, { speeches }) => 
    adapter.addAll(speeches, state)
  ),
  on(SpeechAction.selectSpeech, (state, { id }) => ({
    ...state,
    selectedSpeechId: id,
  }))
  // on(SpeechAction.loadSpeechesSuccess, (state, { speeches }) => ({
  //   ...state,
  //   loaded: true,
  //   loading: false,
  //   ids: speeches.map(speech => speech.id),
  // })),
);

export const getSelectedSpeechId = (state: State) => state.selectedSpeechId;

export const selectId = (state: State) => state.selectedSpeechId;