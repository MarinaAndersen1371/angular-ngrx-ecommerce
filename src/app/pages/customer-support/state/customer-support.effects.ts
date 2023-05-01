import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ticketActions from 'src/app/pages/customer-support/state/customer-support.actions';
import { CustomerSupportService } from 'src/app/pages/customer-support/resources/customer-support.service';

@Injectable()
export class CustomerSupportEffects {
  ticket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketActions.sendMessage),
      concatMap((action) =>
        this.ticketService
          .ticket(action.name, action.email, action.message)
          .pipe(
            map((ticket) => ticketActions.sendMessageSuccess({ ticket })),
            catchError((error) =>
              of(ticketActions.sendMessageFailure({ error }))
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private ticketService: CustomerSupportService
  ) {}
}
