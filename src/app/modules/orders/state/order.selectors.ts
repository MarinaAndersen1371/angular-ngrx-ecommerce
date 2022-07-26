import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as OrderReducer from 'src/app/modules/orders/state/order.reducers';
import { Order } from 'src/app/modules/orders/resources/orders';

export const selectOrdersState = createFeatureSelector<OrderReducer.State>(
  OrderReducer.ordersFeatureKey
);

export interface OrdersViewModel {
  orders: Order[];
  statistics: any;
  error: any;
}

export const selectOrdersViewModel = createSelector(
  selectOrdersState,
  (state: OrderReducer.State): OrdersViewModel => {
    return {
      orders: state.orders,
      statistics: state.statistics,
      error: state.error,
    };
  }
);

export interface OrderViewModel {
  order: Order | {};
  error: any;
}

export const selectOrderViewModel = createSelector(
  selectOrdersState,
  (state: OrderReducer.State): OrderViewModel => {
    return {
      order: state.order,
      error: state.error,
    };
  }
);
