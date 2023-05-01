import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/modules/orders/resources/orders';

export const loadMyOrders = createAction(
  '[My Orders Component] Load My Orders'
);
export const loadAdminOrders = createAction(
  '[Admin Orders Component] Load Admin Orders'
);
export const loadManagerOrders = createAction(
  '[Manager Orders Component] Load Manager Orders'
);
export const loadOrdersSuccess = createAction(
  '[Order Effect] Load Orders Success',
  props<{ orders: Order[]; statistics: any }>()
);
export const loadOrdersFailure = createAction(
  '[Order Effect] Load Orders Failure',
  props<{ error: any }>()
);
//*******************/
export const loadOrder = createAction(
  '[Order Component] Load Order',
  props<{ _id: string }>()
);
export const loadAdminOrder = createAction(
  '[Admin Order  Component] Load Admin Order',
  props<{ _id: string }>()
);
export const loadManagerOrder = createAction(
  '[Manager Order Component] Load Manager Order',
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
    address: string;
    city: string;
    postalCode: string;
    country: string;
    delivery: any;
    nameInvoice: string;
    addressInvoice: string;
    cityInvoice: string;
    postalCodeInvoice: string;
    countryInvoice: string;
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
//***********************/
export const updateCustomerVoucher = createAction(
  '[Order Component] Update Customer Voucher',
  props<{ _id: string; userId: string; voucher: string }>()
);
export const updateCustomerVoucherSuccess = createAction(
  '[Order Effect] Update Customer Voucher Success',
  props<{ order: Order }>()
);
export const updateCustomerVoucherFailure = createAction(
  '[Order Effect] Update Customer Voucher Failure',
  props<{ error: any }>()
);

//*******************/
export const updateOrderToSent = createAction(
  '[Order Edit Component] Update Order To Sent',
  props<{ _id: string }>()
);
export const updateManagerOrderToSent = createAction(
  '[Manager Order Edit Component] Update Manager Order To Sent',
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
export const updateManagerOrderToDelivered = createAction(
  '[Manager Order Edit Component] Update Manager Order To Delivered',
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
export const updateManagerInvoiceToSent = createAction(
  '[Order Edit Component] Update Manager Invoice To Sent',
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
//*************************/
export const requestReturn = createAction(
  '[Return Request Component] Request Return',
  props<{ _id: string }>()
);
export const requestReturnSuccess = createAction(
  '[Order Effect] Request Return Success',
  props<{ order: Order }>()
);
export const requestReturnFailure = createAction(
  '[Order Effect] Request Return Failure',
  props<{ error: any }>()
);
//*************************/
export const updateReturnToReceived = createAction(
  '[Order Edit Component] Update Return To Received',
  props<{ _id: string }>()
);
export const updateReturnToReceivedSuccess = createAction(
  '[Order Effect] Update Return To Received Success',
  props<{ order: Order }>()
);
export const updateReturnToReceivedFailure = createAction(
  '[Order Effect] Update Return To Received Failure',
  props<{ error: any }>()
);
//*************************/
export const updateRefundToPaid = createAction(
  '[Order Edit Component] Update Refund To Paid',
  props<{ _id: string }>()
);
export const updateRefundToPaidSuccess = createAction(
  '[Order Effect] Update Refund To Paid Success',
  props<{ order: Order }>()
);
export const updateRefundToPaidFailure = createAction(
  '[Order Effect] Update Refund To Paid Failure',
  props<{ error: any }>()
);
//*************************/
export const updateReturnToClosed = createAction(
  '[Order Edit Component] Update Return To Closed',
  props<{ _id: string }>()
);
export const updateReturnToClosedSuccess = createAction(
  '[Order Effect] Update Return To Closed Success',
  props<{ order: Order }>()
);
export const updateReturnToClosedFailure = createAction(
  '[Order Effect] Update Return To Closed Failure',
  props<{ error: any }>()
);
//*************************/
