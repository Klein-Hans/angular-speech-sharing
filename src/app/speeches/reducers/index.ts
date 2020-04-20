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

export interface State extends fromRoot.State {
  speeches: fromSpeech.State
}

export const reducers: ActionReducerMap<State> = {
  speeches: fromSpeech.reducer,
};

export const selectSpeechState = createFeatureSelector<fromSpeech.State>(
  speechesFeatureKey
);

export const selectSpeechIds = createSelector(
  selectSpeechState,
  fromSpeech.selectSpeechIds // shorthand for speechState => fromSpeech.selectSpeechIds(speechState)
);
export const selectSpeechEntities = createSelector(
  selectSpeechState,
  fromSpeech.selectSpeechEntities
);
export const selectAllSpeeches = createSelector(
  selectSpeechState,
  fromSpeech.selectAllSpeeches
);
export const selectSpeechTotal = createSelector(
  selectSpeechState,
  fromSpeech.selectSpeechTotal
);

export const selectCurrentSpeechId = createSelector(
  selectSpeechState,
  fromSpeech.getSelectedSpeechId
);
 
export const selectCurrentSpeech = createSelector(
  selectSpeechEntities,
  selectCurrentSpeechId,
  (speechEntities, speechId) => speechEntities[speechId]
);