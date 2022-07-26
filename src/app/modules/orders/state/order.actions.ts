import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/modules/orders/resources/orders';

export const loadMyOrders = createAction('[MyOrders Component] Load My Orders');

export const loadMyOrdersSuccess = createAction(
  '[Order Effect] Load My Orders Success',
  props<{ orders: any }>()
);

export const loadMyOrdersFailure = createAction(
  '[My Orders Component] Load My Orders Failure',
  props<{ error: any }>()
);
//********************/
export const loadAdminOrders = createAction(
  '[AdminOrders Component] Load Admin Orders'
);

export const loadAdminOrdersSuccess = createAction(
  '[Order Effect] Load Admin Orders Success',
  props<{ orders: any; statistics: any }>()
);

export const loadAdminOrdersFailure = createAction(
  '[AdminOrders Component] Load Admin Orders Failure',
  props<{ error: any }>()
);
//*******************/
export const loadOrder = createAction(
  '[Order Component] Load Order',
  props<{ _id: string }>()
);

export const loadOrderSuccess = createAction(
  '[Order Effect] Load Order Success',
  props<{ order: Order }>()
);

export const loadOrderFailure = createAction(
  '[Order Effect] Load Order Failure',
  props<{ error: any }>()
);
//********************/
export const createOrder = createAction(
  '[Cart Checkout Component] Create Order',
  props<{
    _id: any;
    name: string;
    delivery: any;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    method: string;
    account: string;
    prime: string;
    franchise: string;
  }>()
);
export const createOrderSuccess = createAction(
  '[Order Effect] Create Order Success',
  props<{ order: Order }>()
);
export const createOrderFailure = createAction(
  '[Order Effect] Create Order Failure',
  props<{ error: any }>()
);
//***********************/
export const updateOrderToPaid = createAction(
  '[Order Component] Update Order To Paid',
  props<{ _id: string }>()
);
export const updateOrderToPaidSuccess = createAction(
  '[Order Effect] Update Order To Paid Success',
  props<{ order: Order }>()
);
export const updateOrderToPaidFailure = createAction(
  '[Order Effect] Update Order To Paid Failure',
  props<{ error: any }>()
);
//*********************/
export const updateOrderToSent = createAction(
  '[Order Edit Component] Update Order To Sent',
  props<{ _id: string }>()
);
export const updateOrderToSentSuccess = createAction(
  '[Order Effect] Update Order To Sent Success',
  props<{ order: Order }>()
);
export const updateOrderToSentFailure = createAction(
  '[Order Effect] Update Order To Sent Failure',
  props<{ error: any }>()
);
//*************************/
export const updateOrderToDelivered = createAction(
  '[Order Edit Component] Update Order To Delivered',
  props<{ _id: string }>()
);
export const updateOrderToDeliveredSuccess = createAction(
  '[Order Effect] Update Order To Delivered Success',
  props<{ order: Order }>()
);
export const updateOrderToDeliveredFailure = createAction(
  '[Order Effect] Update Order To Delivered Failure',
  props<{ error: any }>()
);
//*************************/
export const updateInvoiceToSent = createAction(
  '[Order Edit Component] Update Invoice To Sent',
  props<{ _id: string }>()
);
export const updateInvoiceToSentSuccess = createAction(
  '[Order Effect] Update Invoice To Sent Success',
  props<{ order: Order }>()
);
export const updateInvoiceToSentFailure = createAction(
  '[Order Effect] Update Invoice To Sent Failure',
  props<{ error: any }>()
);
