import { createReducer, on } from '@ngrx/store';

import * as MailActions from 'src/app/modules/mails/state/mail.actions';
import { Mail } from 'src/app/modules/mails/resources/mail';

export const mailsFeatureKey = 'Mails';

export interface State {
  mail: Mail | {};
  mails: Mail[];
  isLoading: boolean | null;
  error: any | null;
}

export const initialState: State = {
  mail: {},
  mails: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(MailActions.loadMails, MailActions.loadMail, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(MailActions.loadMailsSuccess, (state, action) => {
    return {
      ...state,
      mails: action.mails,
      error: null,
    };
  }),

  on(
    MailActions.loadMailSuccess,
    MailActions.statusMailSuccess,
    MailActions.openMailSuccess,
    MailActions.sendMailSuccess,
    (state, action) => {
      return {
        ...state,
        mail: action.mail,
        error: null,
      };
    }
  ),

  on(
    MailActions.loadMailsFailure,
    MailActions.loadMailFailure,
    MailActions.deleteMailInFailure,
    MailActions.deleteMailOutFailure,
    MailActions.sendMailFailure,
    MailActions.statusMailFailure,
    MailActions.openMailFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(MailActions.deleteMailIn, MailActions.deleteMailOut, (state, action) => {
    return {
      ...state,
      mail: action.mailId,
      error: null,
    };
  }),

  on(MailActions.deleteMailInSuccess, MailActions.deleteMailOut, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);
