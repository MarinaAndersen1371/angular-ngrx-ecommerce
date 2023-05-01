import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

export const sendMessage = createAction(
  '[Customer Support Component] Customer Support',
  props<{ name: string; email: string; message: string }>()
);

export const sendMessageSuccess = createAction(
  '[Customer Support Effect] Customer Support Success',
  props<{ ticket: Ticket }>()
);

export const sendMessageFailure = createAction(
  '[Customer Support Effect] Customer Support Failure',
  props<{ error: any }>()
);
