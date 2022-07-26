import { createReducer, on } from '@ngrx/store';
import * as orderActions from 'src/app/modules/orders/state/order.actions';
import { Order } from 'src/app/modules/orders/resources/orders';

export const ordersFeatureKey = 'orders';

export interface State {
  orders: Order[];
  order: Order | {};
  isLoading: boolean | null;
  statistics: any | null;
  error: any | null;
}

export const initialState: State = {
  orders: [],
  statistics: null,
  order: {},
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    orderActions.loadMyOrders,
    orderActions.loadAdminOrders,
    orderActions.loadOrder,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),

  on(orderActions.loadMyOrdersSuccess, (state, action) => {
    return {
      ...state,
      orders: action.orders,
      error: null,
    };
  }),

  on(orderActions.loadAdminOrdersSuccess, (state, action) => {
    return {
      ...state,
      orders: action.orders,
      statistics: action.statistics,
      error: null,
    };
  }),

  on(
    orderActions.loadOrderSuccess,
    orderActions.createOrderSuccess,
    orderActions.updateOrderToPaidSuccess,
    orderActions.updateOrderToSentSuccess,
    orderActions.updateOrderToDeliveredSuccess,
    orderActions.updateInvoiceToSentSuccess,
    (state, action) => {
      return {
        ...state,
        order: action.order,
        error: null,
      };
    }
  ),

  on(
    orderActions.loadOrderFailure,
    orderActions.createOrderFailure,
    orderActions.updateOrderToPaidFailure,
    orderActions.updateOrderToSentFailure,
    orderActions.updateOrderToDeliveredFailure,
    orderActions.updateInvoiceToSentFailure,
    orderActions.loadMyOrdersFailure,
    orderActions.loadAdminOrdersFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
