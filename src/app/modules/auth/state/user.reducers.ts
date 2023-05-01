import { createReducer, on } from '@ngrx/store';
import * as UserActions from 'src/app/modules/auth/state/user.actions';
import { User } from 'src/app/modules/auth/resources/auth';

export const usersFeatureKey = 'users';

export interface State {
  users: User[];
  user: User | {};
  isLoading: boolean | null;
  error: any;
  statistics: any;
}

export const initialState: State = {
  users: [],
  user: {},
  isLoading: false,
  error: null,
  statistics: {},
};

export const reducer = createReducer(
  initialState,

  on(
    UserActions.loadUsers,
    UserActions.loadManagerUsers,
    UserActions.loadUser,
    UserActions.loadManagerUser,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),

  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
      statistics: action.statistics,
      error: null,
    };
  }),

  on(
    UserActions.loadUserSuccess,
    UserActions.updateUserSuccess,
    UserActions.updateProfileSuccess,
    UserActions.updateUserTestSuccess,
    UserActions.updateTestScoreSuccess,
    UserActions.updateUserCouponSuccess,
    UserActions.resetPasswordSuccess,
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
    UserActions.updateUserTestFailure,
    UserActions.updateProfileFailure,
    UserActions.updateTestScoreFailure,
    UserActions.updateUserCouponFailure,
    UserActions.resetPasswordFailure,
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
