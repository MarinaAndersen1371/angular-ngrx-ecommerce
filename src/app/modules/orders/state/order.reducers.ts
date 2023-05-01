import { createReducer, on } from '@ngrx/store';
import * as orderActions from 'src/app/modules/orders/state/order.actions';
import { Order } from 'src/app/modules/orders/resources/orders';

export const ordersFeatureKey = 'orders';

export interface State {
  orders: Order[];
  order: Order | {};
  isLoading: boolean | null;
  statistics: any;
  error: any | null;
}

export const initialState: State = {
  orders: [],
  statistics: {},
  order: {},
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    orderActions.loadMyOrders,
    orderActions.loadAdminOrders,
    orderActions.loadManagerOrders,
    orderActions.loadOrder,
    orderActions.loadAdminOrder,
    orderActions.loadManagerOrder,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),

  on(orderActions.loadOrdersSuccess, (state, action) => {
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
    orderActions.updateCustomerVoucherSuccess,
    orderActions.updateOrderToSentSuccess,
    orderActions.updateOrderToDeliveredSuccess,
    orderActions.updateInvoiceToSentSuccess,
    orderActions.updateReturnToReceivedSuccess,
    orderActions.updateRefundToPaidSuccess,
    orderActions.updateReturnToClosedSuccess,
    orderActions.requestReturnSuccess,
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
    orderActions.updateCustomerVoucherFailure,
    orderActions.updateOrderToSentFailure,
    orderActions.updateOrderToDeliveredFailure,
    orderActions.updateInvoiceToSentFailure,
    orderActions.updateReturnToReceivedFailure,
    orderActions.updateRefundToPaidFailure,
    orderActions.updateReturnToClosedFailure,
    orderActions.loadOrdersFailure,
    orderActions.requestReturnFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
