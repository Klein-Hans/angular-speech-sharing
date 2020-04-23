import { Speech } from '../models';
import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromSpeech from './speech.reducer';
import * as fromRoot from '../../reducers';

export const speechesFeatureKey = 'speeches';

export interface SpeechesState {
  [fromSpeech.speechFeatureKey]: fromSpeech.State;
  //...
}

export interface State extends fromRoot.State {
  [speechesFeatureKey]: fromSpeech.State,
  // [fromSearch.searchFeatureKey]: fromSearch.State;
  // [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export function reducers(state: SpeechesState | undefined, action: Action) {
  return combineReducers({
    [fromSpeech.speechFeatureKey]: fromSpeech.reducer,
    // [fromSearch.searchFeatureKey]: fromSearch.reducer,
    // [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

export const selectSpeechesState = createFeatureSelector<State, SpeechesState>(
  speechesFeatureKey
);

export const selectSpeechState = createSelector(
  selectSpeechesState,
  state => state.speeches
);

export const selectSelectedSpeechId = createSelector(
  selectSpeechState,
  fromSpeech.getSelectedSpeechId
);

export const {
  selectIds: selectIds,
  selectEntities: selectSpeechesEntities,
  selectAll: selectAllSpeeches,
  selectTotal: selectTotalSpeeches,
} = fromSpeech.adapter.getSelectors(selectSpeechState);

export const selectSelectedSpeech = createSelector(
  selectSpeechesEntities,
  selectSelectedSpeechId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);