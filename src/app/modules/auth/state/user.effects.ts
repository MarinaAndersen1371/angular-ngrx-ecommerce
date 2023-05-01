import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from 'src/app/modules/auth/resources/user.service';
import * as UserActions from 'src/app/modules/auth/state/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers, UserActions.loadManagerUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(({ users, statistics }) =>
            UserActions.loadUsersSuccess({ users, statistics })
          ),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.loadUser,
        UserActions.loadProfile,
        UserActions.loadManagerUser
      ),
      mergeMap((action) =>
        this.userService.getUser(action._id).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.loadUserFailure({ error: error }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService
          .updateUser(
            action._id,
            action.firstName,
            action.username,
            action.email,
            action.phone,
            action.purpose,
            action.birthday,
            action.gender,
            action.isPrime,
            action.coupon,
            action.testPaid,
            action.testScore,
            action.isFranchise,
            action.isManager
          )
          .pipe(
            map((user) => UserActions.updateUserSuccess({ user })),
            catchError((error) => of(UserActions.updateUserFailure({ error })))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.userService.removeUser(action.userId).pipe(
          map((user) => UserActions.deleteUserSuccess({ user })),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addToCart),
      mergeMap((action) =>
        this.userService
          .addToCart(
            action._id,
            action.item,
            action.qty,
            action.warranty,
            action.gift,
            action.extra1,
            action.extra2
          )
          .pipe(
            map((user) => UserActions.addToCartSuccess({ user })),
            catchError((error) =>
              of(UserActions.addToCartFailure({ error: error }))
            )
          )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeFromCart),
      mergeMap((action) =>
        this.userService.removeFromCart(action._id, action.item).pipe(
          map((user) => UserActions.removeFromCartSuccess({ user })),
          catchError((error) =>
            of(UserActions.removeFromCartFailure({ error: error }))
          )
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateProfile),
      mergeMap((action) =>
        this.userService
          .updateProfile(
            action._id,
            action.firstName,
            action.username,
            action.email,
            action.password,
            action.phone,
            action.purpose,
            action.birthday,
            action.gender
          )
          .pipe(
            map((user) => UserActions.updateProfileSuccess({ user })),
            catchError((error) =>
              of(UserActions.updateProfileFailure({ error }))
            )
          )
      )
    )
  );

  updateUserTest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserTest),
      mergeMap((action) =>
        this.userService
          .updateUserTest(
            action._id,
            action.test1,
            action.test2,
            action.test3,
            action.test4,
            action.test5
          )
          .pipe(
            map((user) => UserActions.updateUserTestSuccess({ user })),
            catchError((error) =>
              of(UserActions.updateUserTestFailure({ error }))
            )
          )
      )
    )
  );

  updateTestScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateTestScore),
      mergeMap((action) =>
        this.userService.updateTestScore(action._id, action.testScore).pipe(
          map((user) => UserActions.updateTestScoreSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateTestScoreFailure({ error }))
          )
        )
      )
    )
  );

  updateUserCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserCoupon),
      mergeMap((action) =>
        this.userService.updateUserCoupon(action._id, action.coupon).pipe(
          map((user) => UserActions.updateUserCouponSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateUserCouponFailure({ error }))
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.resetPassword),
      mergeMap((action) =>
        this.userService.resetPassword(action._id).pipe(
          map((user) => UserActions.resetPasswordSuccess({ user })),
          catchError((error) => of(UserActions.resetPasswordFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
