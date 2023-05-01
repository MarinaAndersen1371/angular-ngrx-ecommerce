import { createReducer, on } from '@ngrx/store';

import * as TicketActions from 'src/app/pages/customer-support/state/ticket.actions';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

export const ticketsFeatureKey = 'Tickets';

export interface State {
  ticket: Ticket | {};
  tickets: Ticket[];
  statistics: any;
  isLoading: boolean | null;
  error: any | null;
}

export const initialState: State = {
  ticket: {},
  tickets: [],
  statistics: {},
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    TicketActions.loadTickets,
    TicketActions.loadManagerTickets,
    TicketActions.loadTicket,
    TicketActions.loadManagerTicket,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),

  on(TicketActions.loadTicketsSuccess, (state, action) => {
    return {
      ...state,
      tickets: action.tickets,
      statistics: action.statistics,
      error: null,
    };
  }),

  on(
    TicketActions.loadTicketSuccess,
    TicketActions.openTicketSuccess,
    TicketActions.updateTicketSuccess,
    (state, action) => {
      return {
        ...state,
        ticket: action.ticket,
        error: null,
      };
    }
  ),

  on(
    TicketActions.loadTicketsFailure,
    TicketActions.loadTicketFailure,
    TicketActions.deleteTicketFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(TicketActions.deleteTicket, (state, action) => {
    return {
      ...state,
      ticket: action.ticketId,
      error: null,
    };
  }),

  on(TicketActions.deleteTicketSuccess, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);
