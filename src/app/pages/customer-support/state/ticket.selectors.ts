import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as TicketReducer from 'src/app/pages/customer-support/state/ticket.reducers';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

export const selectTicketsState = createFeatureSelector<TicketReducer.State>(
  TicketReducer.ticketsFeatureKey
);

export interface TicketsViewModel {
  tickets: Ticket[];
  error: any;
}

export interface TicketViewModel {
  ticket: Ticket | {};
  error: any;
}

export const selectTicketsViewModel = createSelector(
  selectTicketsState,
  (state: TicketReducer.State): TicketsViewModel => {
    return {
      tickets: state.tickets,
      error: state.error,
    };
  }
);

export const selectTicketViewModel = createSelector(
  selectTicketsState,
  (state: TicketReducer.State): TicketViewModel => {
    return {
      ticket: state.ticket,
      error: state.error,
    };
  }
);
