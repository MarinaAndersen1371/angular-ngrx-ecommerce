import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TicketService } from 'src/app/pages/customer-support/resources/ticket.service';
import * as TicketActions from 'src/app/pages/customer-support/state/ticket.actions';

@Injectable()
export class TicketEffects {
  loadTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketActions.loadTickets, TicketActions.loadManagerTickets),
      mergeMap(() =>
        this.ticketService.getTickets().pipe(
          map(({ tickets, statistics }) =>
            TicketActions.loadTicketsSuccess({ tickets, statistics })
          ),
          catchError((error) => of(TicketActions.loadTicketsFailure({ error })))
        )
      )
    );
  });

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadTicket, TicketActions.loadManagerTicket),
      mergeMap((action) =>
        this.ticketService.getTicket(action._id).pipe(
          map((ticket) => TicketActions.loadTicketSuccess({ ticket })),
          catchError((error) =>
            of(TicketActions.loadTicketFailure({ error: error }))
          )
        )
      )
    )
  );

  openTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.openTicket, TicketActions.openManagerTicket),
      mergeMap((action) =>
        this.ticketService.openTicket(action._id).pipe(
          map((ticket) => TicketActions.openTicketSuccess({ ticket })),
          catchError((error) => of(TicketActions.openTicketFailure({ error })))
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.updateTicket),
      mergeMap((action) =>
        this.ticketService
          .updateTicket(
            action._id,
            action.commentAdmin,
            action.timeAdmin,
            action.status
          )
          .pipe(
            map((ticket) => TicketActions.updateTicketSuccess({ ticket })),
            catchError((error) =>
              of(TicketActions.updateTicketFailure({ error }))
            )
          )
      )
    )
  );

  updateManagerTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.updateManagerTicket),
      mergeMap((action) =>
        this.ticketService
          .updateManagerTicket(
            action._id,
            action.commentManager,
            action.timeManager,
            action.status
          )
          .pipe(
            map((ticket) => TicketActions.updateTicketSuccess({ ticket })),
            catchError((error) =>
              of(TicketActions.updateTicketFailure({ error }))
            )
          )
      )
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.deleteTicket),
      mergeMap((action) =>
        this.ticketService.removeTicket(action.ticketId).pipe(
          map(() => TicketActions.deleteTicketSuccess()),
          catchError((error) =>
            of(TicketActions.deleteTicketFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}
}
