import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { Speech } from '../models';
import { SpeechAction } from '../actions';
import { SpeechService } from '../services'

@Injectable()
export class SpeechEffects {

  @Effect()
  loadSpeeches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeechAction.loadSpeeches),
      switchMap(() => 
        this.speechService.getAll().pipe(
          map((speeches: Speech[]) =>
            SpeechAction.loadSpeechesSuccess({ speeches })
          ),
          catchError(err =>
            of(SpeechAction.loadSpeechesFail({ errorMsg: err.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private speechService: SpeechService
    // private googleBooks: GoogleBooksService
  ) {} 
}