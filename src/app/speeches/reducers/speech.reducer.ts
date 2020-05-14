import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SpeechPageAction, SpeechApiAction } from '../actions';
import { Speech } from '../models';

export const speechFeatureKey = 'speeches';

export interface State extends EntityState<Speech> {
  selectedSpeechId: string | null;
  error: string | null,
  loading: boolean,
  ids: string[],
}

export function sortByPublishedDate(a: Speech, b: Speech): number {
  return a.publishedDate.toString().localeCompare(b.publishedDate.toString());
}

export const adapter: EntityAdapter<Speech> = createEntityAdapter<Speech>({
  selectId: (speech: Speech) => speech.id,
  sortComparer: sortByPublishedDate,
});

export const initialState: State = adapter.getInitialState({
  selectedSpeechId: null,
  error: null,
  loading: false,
  ids: [],
}); 

export const reducer = createReducer(
  initialState,

  /**
   * Loading Reducers 
   */ 
  on(SpeechPageAction.loadSpeeches, state => ({
    ...state,
    loading: true,
  })),
  on(SpeechApiAction.getSpeeches, (state, { speeches }) => 
    adapter.addAll(speeches, state)
  ),
  on(SpeechApiAction.loadSpeechesSuccess, state => ({
    ...state,
    loaded: true,
    loading: false,
  })),

  /**
   * Select Speech Reducer
   */
  on(SpeechPageAction.selectSpeech, (state, { id }) => ({
    ...state,
    selectedSpeechId: id,
  })),


  /**
   * Add Speech Reducers
   */
  on(SpeechApiAction.addSpeech, (state, { speech }) => 
    adapter.addOne(speech, state)
  ),
  // on(SpeechApiAction.addSpeechSuccess, (state, { speech }) => {
  //   if (state.ids.indexOf(speech.id) > -1) {
  //     return state;
  //   }
  //   return {
  //     ...state,
  //     ids: [...state.ids, speech.id],
  //   };
  // }),
  // on(SpeechApiAction.addSpeechFail, (state, { speech }) => ({
  //     ...state,
  //     ids: state.ids.filter(id => id !== speech.id),
  //   })
  // ),

  /**
   * Update Speech Reducers
   */
  on(SpeechApiAction.updateSpeech, (state, { speech }) => 
    adapter.updateOne(speech, state)
  ),
  on(SpeechApiAction.updateSpeechSuccess, (state, { speech }) => ({
    ...state,
    selectedSpeechId: speech.id
  })),

  /**
   * Delete Speech Reducers
   */
  on(SpeechApiAction.deleteSpeech, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  // on(SpeechApiAction.deleteSpeechSuccess, (state, { speech }) => ({
  //     ...state,
  //     ids: state.ids.filter(id => id !== speech.id),
  //   })
  // ),
  // on(SpeechApiAction.deleteSpeechFail,
  //   (state, { speech }) => {
  //     if (state.ids.indexOf(speech.id) > -1) {
  //       return state;
  //     }
  //     return {
  //       ...state,
  //       ids: [...state.ids, speech.id],
  //     }
  //   }
  // ),
);

export const getSelectedSpeechId = (state: State) => state.selectedSpeechId;