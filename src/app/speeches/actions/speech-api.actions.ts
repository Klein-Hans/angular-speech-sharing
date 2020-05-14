import { createAction, props } from '@ngrx/store';
import { Speech } from '../models';
import { Update } from '@ngrx/entity';

export const searchSuccess = createAction(
  '[Speech/API] Search Success',
  props<{ speech: Speech[] }>()
);

export const searchFailure = createAction(
  '[Speech/API] Search Failure',
  props<{ errorMsg: string }>()
);

export const getSpeeches = createAction(
  '[Speeches/API] Load Speeches',
  props<{ speeches: Speech[] }>()
);

export const loadSpeechesSuccess = createAction(
  '[Speeches/API] Load Speeches Success',
  props<{ speeches: Speech[] }> ()
);

export const loadSpeechesFail = createAction(
  '[Speeches/API] Load Speeches Fail',
  props<{ errorMsg: string }>()
);

export const addSpeech = createAction(
  '[Speeches/API] Add Speech',
  props<{ speech: Speech }>()
);

export const addSpeechSuccess = createAction(
  '[Speeches/API] Add Speech Success',
  props<{ speech: Speech }>()
);

export const addSpeechFail = createAction(
  '[Speeches/API] Add Speech Fail',
  props<{ speech: Speech }>()
);

export const updateSpeech = createAction(
  '[Speeches/API] Update Speech',
  props<{ speech: Update<Speech> }>()
);

export const updateSpeechSuccess = createAction(
  '[Speeches/API] Update Speech Success',
  props<{ speech: Speech }>()
);

export const updateSpeechFail = createAction(
  '[Speeches/API] Update Speech Fail',
  props<{ speech: Speech }>()
);

export const deleteSpeech = createAction(
  '[Speeches/API] Delete Speech',
  props<{ id: string }>()
);

export const deleteSpeechSuccess = createAction(
  '[Speeches/API] Delete Speech Success',
  props<{ speech: Speech }>()
);

export const deleteSpeechFail = createAction(
  '[Speeches/API] Delete Speech Fail',
  props<{ speech: Speech }>()
);