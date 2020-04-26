import { createAction, props } from '@ngrx/store';
import { Speech } from '../models';
import { Update } from '@ngrx/entity';

export const loadSpeeches = createAction('[Speech Module] Load Speeches',);

export const selectSpeech = createAction(
  '[Speech Module] Select Speech',
  props<{ id: string }>()
);

export const updateSpeech = createAction(
  '[Selected Speech] Update Speech',
  props<{ speech: Speech }>()
);

export const deleteSpeech = createAction(
  '[Selected Speech] Remove Speech',
  props<{ speech: Speech }>()
);

export const addSpeech = createAction(
  '[New Speech] Add Speech',
  props<{ speech: Speech }>()
);


