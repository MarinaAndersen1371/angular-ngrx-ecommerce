import { createAction, props } from '@ngrx/store';
import { Ticket } from '../resources/customer-message';

export const loadTickets = createAction('[Tickets Component] Load Tickets');
export const loadTicketsSuccess = createAction(
  '[Ticket Effect] Load Tickets Success',
  props<{ tickets: any }>()
);
export const loadTicketsFailure = createAction(
  '[Tickets Component] Load Tickets Failure',
  props<{ error: any }>()
);
//******************/
export const loadTicket = createAction(
  '[Ticket Component] Load Ticket',
  props<{ _id: string }>()
);
export const loadTicketSuccess = createAction(
  '[Ticket Effect] Load Ticket Success',
  props<{ ticket: Ticket }>()
);
export const loadTicketFailure = createAction(
  '[Ticket Component] Load Ticket Failure',
  props<{ error: any }>()
);
//******************/
export const deleteTicket = createAction(
  '[Ticket List Component] Delete Ticket',
  props<{ ticketId: any }>()
);
export const deleteTicketSuccess = createAction(
  '[Ticket Effect] Delete Ticket Success'
);
export const deleteTicketFailure = createAction(
  '[Ticket Effect] Delete Ticket Failure',
  props<{ error: any }>()
);
//******************/
export const openTicket = createAction(
  '[Ticket Component] Open Ticket',
  props<{ _id: string }>()
);
export const openTicketSuccess = createAction(
  '[Ticket Effect] Open Ticket Success',
  props<{ ticket: Ticket }>()
);
export const openTicketFailure = createAction(
  '[Ticket Component] Open Ticket Failure',
  props<{ error: any }>()
);
//******************/
export const updateTicket = createAction(
  '[Ticket Component] Update Ticket',
  props<{ _id: string; commentAdmin: string; status: string }>()
);
export const updateTicketSuccess = createAction(
  '[Ticket Effect] Update Ticket Success',
  props<{ ticket: Ticket }>()
);
export const updateTicketFailure = createAction(
  '[Ticket Component] Update Ticket Failure',
  props<{ error: any }>()
);
