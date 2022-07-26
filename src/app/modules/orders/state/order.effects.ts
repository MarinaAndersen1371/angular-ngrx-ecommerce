import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderService } from 'src/app/modules/orders/resources/order.service';
import * as orderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class OrderEffects {
  loadMyOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.loadMyOrders),
      mergeMap(() =>
        this.orderService.getMyOrders().pipe(
          map((orders) => orderActions.loadMyOrdersSuccess({ orders: orders })),
          catchError((error) => of(orderActions.loadMyOrdersFailure({ error })))
        )
      )
    );
  });

  loadAdminOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.loadAdminOrders),
      mergeMap(() =>
        this.orderService.getAdminOrders().pipe(
          map(({ orders, statistics }) =>
            orderActions.loadAdminOrdersSuccess({
              orders: orders,
              statistics: statistics,
            })
          ),
          catchError((error) =>
            of(orderActions.loadAdminOrdersFailure({ error }))
          )
        )
      )
    );
  });

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrder),
      mergeMap((action) =>
        this.orderService.getOrder(action._id).pipe(
          map((order) => orderActions.loadOrderSuccess({ order: order })),
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
            action.delivery,
            action.address,
            action.city,
            action.postalCode,
            action.country,
            action.method,
            action.account,
            action.prime,
            action.franchise
          )
          .pipe(
            map((order) => orderActions.createOrderSuccess({ order: order })),
            catchError((error) =>
              of(orderActions.createOrderFailure({ error: error }))
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
          map((order) =>
            orderActions.updateOrderToPaidSuccess({ order: order })
          ),
          catchError((error) =>
            of(orderActions.updateOrderToPaidFailure({ error }))
          )
        )
      )
    )
  );

  updateOrderToSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateOrderToSent),
      mergeMap((action) =>
        this.orderService.updateOrderToSent(action._id).pipe(
          map((order) =>
            orderActions.updateOrderToSentSuccess({ order: order })
          ),
          catchError((error) =>
            of(orderActions.updateOrderToSentFailure({ error }))
          )
        )
      )
    )
  );

  updateOrderToDelivered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateOrderToDelivered),
      mergeMap((action) =>
        this.orderService.updateOrderToDelivered(action._id).pipe(
          map((order) =>
            orderActions.updateOrderToDeliveredSuccess({ order: order })
          ),
          catchError((error) =>
            of(orderActions.updateOrderToDeliveredFailure({ error }))
          )
        )
      )
    )
  );

  updateInvoiceToSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateInvoiceToSent),
      mergeMap((action) =>
        this.orderService.updateInvoiceToSent(action._id).pipe(
          map((order) =>
            orderActions.updateInvoiceToSentSuccess({ order: order })
          ),
          catchError((error) =>
            of(orderActions.updateInvoiceToSentFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
