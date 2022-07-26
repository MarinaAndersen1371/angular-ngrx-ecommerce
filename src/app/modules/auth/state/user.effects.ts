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
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users: users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>
        this.userService.getUser(action._id).pipe(
          map((user) => UserActions.loadUserSuccess({ user: user })),
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
            action.gender
          )
          .pipe(
            map((user) => UserActions.updateUserSuccess({ user: user })),
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
          map(() => UserActions.deleteUserSuccess()),
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
            action.gift
          )
          .pipe(
            map((user) => UserActions.addToCartSuccess({ user: user })),
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
          map((user) => UserActions.removeFromCartSuccess({ user: user })),
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
            map((user) => UserActions.updateProfileSuccess({ user: user })),
            catchError((error) =>
              of(UserActions.updateProfileFailure({ error }))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
