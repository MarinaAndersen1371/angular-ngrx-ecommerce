import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  customerSupportFeatureKey,
} from 'src/app/pages/customer-support/state/customer-support.reducer';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

export const selectCustomerSupportFeature = createFeatureSelector<State>(
  customerSupportFeatureKey
);

export interface CustomerSupportViewModel {
  ticket: Ticket | null;
  error: any | null;
}

export const selectCustomerSupportModel = createSelector(
  selectCustomerSupportFeature,
  (state: State): CustomerSupportViewModel => {
    return {
      ticket: state.ticket,
      error: state.error,
    };
  }
);
