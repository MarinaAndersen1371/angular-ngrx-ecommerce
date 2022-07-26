import { createReducer, on } from '@ngrx/store';

import * as UserActions from 'src/app/modules/auth/state/user.actions';
import { User } from 'src/app/modules/auth/resources/auth';

export const usersFeatureKey = 'users';

export interface State {
  users: User[];
  user: User | {};
  isLoading: boolean | null;
  error: any | null;
}

export const initialState: State = {
  users: [],
  user: {},
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, UserActions.loadUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
      error: null,
    };
  }),

  on(
    UserActions.loadUserSuccess,
    UserActions.updateUserSuccess,
    UserActions.updateProfileSuccess,
    UserActions.addToCartSuccess,
    UserActions.removeFromCartSuccess,
    (state, action) => {
      return {
        ...state,
        user: action.user,
        error: null,
      };
    }
  ),

  on(
    UserActions.loadUsersFailure,
    UserActions.loadUserFailure,
    UserActions.deleteUserFailure,
    UserActions.updateUserFailure,
    UserActions.updateProfileFailure,
    UserActions.addToCartFailure,
    UserActions.removeFromCartFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(UserActions.deleteUser, (state, action) => {
    return {
      ...state,
      user: action.userId,
      error: null,
    };
  }),

  on(UserActions.deleteUserSuccess, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);
