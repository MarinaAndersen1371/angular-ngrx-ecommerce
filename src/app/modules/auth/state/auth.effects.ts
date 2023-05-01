import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from 'src/app/modules/auth/state/auth.actions';
import { AuthService } from 'src/app/modules/auth/resources/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginPage),
      concatMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerPage),
      concatMap((action) =>
        this.authService
          .register(
            action.firstName,
            action.username,
            action.email,
            action.password,
            action.phone,
            action.purpose,
            action.birthday,
            action.gender
          )
          .pipe(
            map((user) => AuthActions.registerSuccess({ user })),
            catchError((error) => of(AuthActions.registerFailure({ error })))
          )
      )
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
