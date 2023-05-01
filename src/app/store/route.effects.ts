import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import * as fromAuthActions from 'src/app/modules/auth/state/auth.actions';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromMailActions from 'src/app/modules/mails/state/mail.actions';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class RouteEffects {
  goShopping$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess, fromAuthActions.registerSuccess),
        tap(() => this.route.navigate(['/shopping/products']))
      ),
    { dispatch: false }
  );

  gohome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.route.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  productList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.addProductSuccess,
          fromProductActions.upsertProductSuccess,
          fromProductActions.deleteItemProduct
        ),
        tap(() => this.route.navigate(['/shopping/products']))
      ),
    { dispatch: false }
  );

  adminUserList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUserActions.updateUserSuccess),
        tap(() => this.route.navigate(['/auth/user-list']))
      ),
    { dispatch: false }
  );

  createdOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromOrderActions.createOrderSuccess,
          fromProductActions.reviewProductSuccess
        ),
        tap(() => this.route.navigate(['/shopping/products']))
      ),
    { dispatch: false }
  );

  buyOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromOrderActions.updateOrderToPaidSuccess,
          fromOrderActions.updateCustomerVoucherSuccess,
          fromOrderActions.requestReturnSuccess
        ),
        tap(() => this.route.navigate(['/buy/myorders']))
      ),
    { dispatch: false }
  );

  editUserProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromUserActions.updateProfileSuccess,
          fromUserActions.updateUserTestSuccess
        ),
        tap((action) =>
          this.route.navigate([`/auth/userprofile/${action.user._id}`])
        )
      ),
    { dispatch: false }
  );

  sentMail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromMailActions.sendMailSuccess),
        tap(() => this.route.navigate(['/auth/sent-mails']))
      ),
    { dispatch: false }
  );

  editManagerUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromUserActions.updateUserCouponSuccess,
          fromUserActions.updateTestScoreSuccess
        ),
        tap((action) =>
          this.route.navigate([`/auth/manager/user/${action.user._id}`])
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private route: Router) {}
}
