import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserReducer from 'src/app/modules/auth/state/user.reducers';
import { User } from 'src/app/modules/auth/resources/auth';

export const selectUsersState = createFeatureSelector<UserReducer.State>(
  UserReducer.usersFeatureKey
);

export interface UsersViewModel {
  users: User[];
  statistics: any;
  error: any;
}

export const selectUsersViewModel = createSelector(
  selectUsersState,
  (state: UserReducer.State): UsersViewModel => {
    return {
      users: state.users,
      statistics: state.statistics,
      error: state.error,
    };
  }
);

export interface UserViewModel {
  user: User | {};
  error: any;
}

export const selectUserViewModel = createSelector(
  selectUsersState,
  (state: UserReducer.State): UserViewModel => {
    return {
      user: state.user,
      error: state.error,
    };
  }
);
