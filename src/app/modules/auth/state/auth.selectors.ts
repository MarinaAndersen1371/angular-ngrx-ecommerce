import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/auth/state/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthLinksViewModal {
  isLoggedIn: boolean;
  firstName: string;
  email: string;
  _id: any;
  isAdmin: boolean;
  isManager: boolean;
  isPrime: boolean;
  isFranchise: boolean;
  coupon: string;
}

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user != null
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user != null && state.user.isadmin
);

export const selectIsFranchise = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean =>
    state.user != null && state.user.isFranchise
);

export const selectIsManager = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user != null && state.user.isManager
);

export const selectIsPrime = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user != null && state.user.isPrime
);

export const selectName = createSelector(
  selectAuthState,
  (state: fromAuth.State): any => state.user != null && state.user.firstName
);

export const selectEmail = createSelector(
  selectAuthState,
  (state: fromAuth.State): any => state.user != null && state.user.email
);

export const selectID = createSelector(
  selectAuthState,
  (state: fromAuth.State): any => state.user != null && state.user._id
);

export const selectCoupon = createSelector(
  selectAuthState,
  (state: fromAuth.State): any => state.user != null && state.user.coupon
);

export const selectAuthLinksViewModel = createSelector(
  selectIsLoggedIn,
  selectName,
  selectEmail,
  selectID,
  selectIsAdmin,
  selectIsManager,
  selectIsPrime,
  selectIsFranchise,
  selectCoupon,
  (
    isLoggedIn: boolean,
    firstName: string,
    email: string,
    _id: any,
    isAdmin: boolean,
    isManager: boolean,
    isPrime: boolean,
    isFranchise: boolean,
    coupon: string
  ): AuthLinksViewModal => {
    return {
      isLoggedIn: isLoggedIn,
      firstName: firstName,
      email: email,
      _id: _id,
      isAdmin: isAdmin,
      isManager: isManager,
      isPrime: isPrime,
      isFranchise: isFranchise,
      coupon: coupon,
    };
  }
);
