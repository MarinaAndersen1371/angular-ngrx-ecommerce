import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderService } from 'src/app/modules/orders/resources/order.service';
import * as orderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        orderActions.loadMyOrders,
        orderActions.loadAdminOrders,
        orderActions.loadManagerOrders
      ),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map(({ orders, statistics }) =>
            orderActions.loadOrdersSuccess({ orders, statistics })
          ),
          catchError((error) => of(orderActions.loadOrdersFailure({ error })))
        )
      )
    );
  });

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.loadOrder,
        orderActions.loadAdminOrder,
        orderActions.loadManagerOrder
      ),
      mergeMap((action) =>
        this.orderService.getOrder(action._id).pipe(
          map((order) => orderActions.loadOrderSuccess({ order })),
          catchError((error) =>
            of(orderActions.loadOrderFailure({ error: error }))
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.createOrder),
      concatMap((action) =>
        this.orderService
          .createOrder(
            action._id,
            action.name,
            action.address,
            action.city,
            action.postalCode,
            action.country,
            action.delivery,
            action.nameInvoice,
            action.addressInvoice,
            action.cityInvoice,
            action.postalCodeInvoice,
            action.countryInvoice,
            action.method,
            action.account,
            action.prime,
            action.franchise
          )
          .pipe(
            map((order) => orderActions.createOrderSuccess({ order })),
            catchError((error) =>
              of(orderActions.createOrderFailure({ error }))
            )
          )
      )
    )
  );

  updateOrderToPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateOrderToPaid),
      mergeMap((action) =>
        this.orderService.updateOrderToPaid(action._id).pipe(
          map((order) => orderActions.updateOrderToPaidSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateOrderToPaidFailure({ error }))
          )
        )
      )
    )
  );

  updateCustomerVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateCustomerVoucher),
      mergeMap((action) =>
        this.orderService
          .updateCustomerVoucher(action._id, action.userId, action.voucher)
          .pipe(
            map((order) =>
              orderActions.updateCustomerVoucherSuccess({ order })
            ),
            catchError((error) =>
              of(orderActions.updateCustomerVoucherFailure({ error }))
            )
          )
      )
    )
  );

  updateOrderToSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateOrderToSent,
        orderActions.updateManagerOrderToSent
      ),
      mergeMap((action) =>
        this.orderService.updateOrderToSent(action._id).pipe(
          map((order) => orderActions.updateOrderToSentSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateOrderToSentFailure({ error }))
          )
        )
      )
    )
  );

  updateOrderToDelivered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateOrderToDelivered,
        orderActions.updateManagerOrderToDelivered
      ),
      mergeMap((action) =>
        this.orderService.updateOrderToDelivered(action._id).pipe(
          map((order) => orderActions.updateOrderToDeliveredSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateOrderToDeliveredFailure({ error }))
          )
        )
      )
    )
  );

  updateInvoiceToSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateInvoiceToSent,
        orderActions.updateManagerInvoiceToSent
      ),
      mergeMap((action) =>
        this.orderService.updateInvoiceToSent(action._id).pipe(
          map((order) => orderActions.updateInvoiceToSentSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateInvoiceToSentFailure({ error }))
          )
        )
      )
    )
  );

  requestReturn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.requestReturn),
      mergeMap((action) =>
        this.orderService.requestReturn(action._id).pipe(
          map((order) => orderActions.requestReturnSuccess({ order })),
          catchError((error) =>
            of(orderActions.requestReturnFailure({ error }))
          )
        )
      )
    )
  );

  updateReturnToReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateReturnToReceived),
      mergeMap((action) =>
        this.orderService.updateReturnToReceived(action._id).pipe(
          map((order) => orderActions.updateReturnToReceivedSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateReturnToReceivedFailure({ error }))
          )
        )
      )
    )
  );

  updateRefundToPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateRefundToPaid),
      mergeMap((action) =>
        this.orderService.updateRefundToPaid(action._id).pipe(
          map((order) => orderActions.updateRefundToPaidSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateRefundToPaidFailure({ error }))
          )
        )
      )
    )
  );

  updateReturnToClosed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateReturnToClosed),
      mergeMap((action) =>
        this.orderService.updateReturnToClosed(action._id).pipe(
          map((order) => orderActions.updateReturnToClosedSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateReturnToClosedFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
