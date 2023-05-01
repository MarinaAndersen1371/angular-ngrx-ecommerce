import { createReducer, on } from '@ngrx/store';
import * as fromSupportActions from './customer-support.actions';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

export const customerSupportFeatureKey = 'customerSupport';

export interface State {
  ticket: Ticket | null;
  error: any | null;
}

export const initialState: State = {
  ticket: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(fromSupportActions.sendMessageSuccess, (state, action) => {
    return {
      ...state,
      ticket: action.ticket,
      error: null,
    };
  }),
  on(fromSupportActions.sendMessageFailure, (state, action) => {
    return {
      ...state,
      ticket: null,
      error: action.error,
    };
  })
);
