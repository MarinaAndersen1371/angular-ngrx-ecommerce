import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/modules/auth/resources/auth';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  error: any | null;
}

export const initialState: State = {
  user: null,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    AuthActions.loginSuccess,
    AuthActions.browserReload,
    AuthActions.registerSuccess,
    (state, action) => {
      return {
        ...state,
        user: action.user,
        error: null,
      };
    }
  ),

  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      error: null,
    };
  }),

  on(AuthActions.registerFailure, AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      user: null,
      error: action.error,
    };
  })
);
