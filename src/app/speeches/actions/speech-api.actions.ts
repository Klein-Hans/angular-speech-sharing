import { createAction, props } from '@ngrx/store';

import { Speech } from '../models';

export const searchSuccess = createAction(
  '[Speech/API] Search Success',
  props<{ speech: Speech[] }>()
);

export const searchFailure = createAction(
  '[Speech/API] Search Failure',
  props<{ errorMsg: string }>()
);
