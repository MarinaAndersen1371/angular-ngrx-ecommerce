import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as MailReducer from 'src/app/modules/mails/state/mail.reducers';
import { Mail } from 'src/app/modules/mails/resources/mail';

export const selectMailsState = createFeatureSelector<MailReducer.State>(
  MailReducer.mailsFeatureKey
);

export interface MailsViewModel {
  mails: Mail[];
  error: any;
}

export interface MailViewModel {
  mail: Mail | {};
  error: any;
}

export const selectMailsViewModel = createSelector(
  selectMailsState,
  (state: MailReducer.State): MailsViewModel => {
    return {
      mails: state.mails,
      error: state.error,
    };
  }
);

export const selectMailViewModel = createSelector(
  selectMailsState,
  (state: MailReducer.State): MailViewModel => {
    return {
      mail: state.mail,
      error: state.error,
    };
  }
);
