import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

import * as fromTicketActions from 'src/app/pages/customer-support/state/ticket.actions';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromAuthActions from 'src/app/modules/auth/state/auth.actions';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginPage,
          fromProductActions.loadProducts,
          fromProductActions.loadAdminProducts,
          fromProductActions.loadProduct,
          fromProductActions.addProduct,
          fromProductActions.loadAdminProduct,
          fromUserActions.loadUsers,
          fromUserActions.loadAdminUsers,
          fromUserActions.loadUser,
          fromUserActions.addToCart,
          fromTicketActions.loadTickets,
          fromTicketActions.loadTicket,
          fromOrderActions.loadMyOrders,
          fromOrderActions.loadAdminOrders,
          fromOrderActions.loadOrder
        ),
        tap(() => this.spinner.show())
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromAuthActions.loginFailure,
          fromProductActions.loadProductsFailure,
          fromProductActions.loadProductsSuccess,
          fromProductActions.loadProductFailure,
          fromProductActions.loadProductSuccess,
          fromProductActions.addProductSuccess,
          fromProductActions.addProductFailure,
          fromTicketActions.loadTicketsSuccess,
          fromTicketActions.loadTicketsFailure,
          fromTicketActions.loadTicketSuccess,
          fromTicketActions.loadTicketFailure,
          fromUserActions.loadUsersSuccess,
          fromUserActions.loadUsersFailure,
          fromUserActions.loadUserSuccess,
          fromUserActions.loadUserFailure,
          fromUserActions.addToCartSuccess,
          fromUserActions.addToCartFailure,
          fromOrderActions.loadMyOrdersSuccess,
          fromOrderActions.loadMyOrdersFailure,
          fromOrderActions.loadAdminOrdersSuccess,
          fromOrderActions.loadAdminOrdersFailure,
          fromOrderActions.loadOrderSuccess,
          fromOrderActions.loadOrderFailure
        ),
        tap(() => {
          this.spinner.hide();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}
}
