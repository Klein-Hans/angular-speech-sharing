import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import * as fromSpeeches from '../../reducers';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';

import { Speech } from '../models';
import { SpeechPageAction, SpeechApiAction } from '../actions';
import { SpeechService } from '../services'
import { Action, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

@Injectable()
export class SpeechEffects {

  ngrxOnInitEffects(): Action {
    return { type: '[Speech Module] Load Speeches' };
  }

  loadSpeeches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeechPageAction.loadSpeeches),
      switchMap(() => 
        this.speechService.getAll().pipe(
          tap((speeches: Speech[]) => 
            this.store.dispatch(SpeechApiAction.loadSpeeches({ speeches }))
          ),
          map((speeches: Speech[]) => 
            SpeechApiAction.loadSpeechesSuccess({ speeches }),
          ),
          catchError(err =>
            of(SpeechApiAction.loadSpeechesFail({ errorMsg: err.message }))
          )
        )
      )
    )
  );

  addSpeech$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SpeechPageAction.addSpeech),
      mergeMap(({ speech }) =>
        this.speechService.add(speech).pipe(
          map(() => SpeechApiAction.addSpeechSuccess({ speech })),
          catchError(() => of(SpeechApiAction.addSpeechFail({ speech })))
        )
      )
    )
  );

  updateSpeech$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SpeechPageAction.updateSpeech),
      mergeMap(({ speech }) => 
        this.speechService.update(speech).pipe(
          tap(speech$ => {
            console.log(speech$);
            const speech: Update<Speech> = {
              id: speech$.id,
              changes: { ...speech$ }
            }
            this.store.dispatch(SpeechApiAction.updateSpeech({ speech }))
            const id = speech$.id;
            // this.store.dispatch(SpeechPageAction.selectSpeech({ id }))
          }),
          map(() => SpeechApiAction.updateSpeechSuccess({ speech })),
          catchError(() => of(SpeechApiAction.updateSpeechFail({ speech })))
        )
      )
    )
  );
  
  deleteSpeech$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SpeechPageAction.deleteSpeech),
      mergeMap(({ speech }) =>
        this.speechService.delete(speech.id).pipe(
          tap(id => {
            this.store.dispatch(SpeechApiAction.deleteSpeech({ id }));
          }),
          map(() => SpeechApiAction.deleteSpeechSuccess({speech})),
          catchError(() => of(SpeechApiAction.deleteSpeechFail({ speech })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private speechService: SpeechService,
    private store: Store<fromSpeeches.State>
    // private googleBooks: GoogleBooksService
  ) {} 
}
