import { createAction, props } from '@ngrx/store';
import { Speech } from '../models';

export const loadSpeeches = createAction('[Speech Module] Load Speeches',);

export const selectSpeech = createAction(
  '[Speech Module] Select Speech',
  props<{ speech: Speech }>()
);

export const loadSpeechesSuccess = createAction(
  '[Speeches/API] Load Speeches Success',
  props<{ speeches: Speech[] }>()
);

export const loadSpeechesFail = createAction(
  '[Speeches/API] Load Speeches Fail',
  props<{ errorMsg: string }>()
);

export const updateSpeech = createAction(
  '[Selected Speech] Update Speech',
  props<{ speech: Speech }>()
);

export const removeSpeech = createAction(
  '[Selected Speech] Remove Speech',
  props<{ speech: Speech }>()
);

export const addSpeech = createAction(
  '[New Speech] Add Speech',
  props<{ speech: Speech }>()
);


