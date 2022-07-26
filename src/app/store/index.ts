import { ActionReducerMap } from '@ngrx/store';
import * as fromCustomerSupport from '../pages/customer-support/state/customer-support.reducer';
import * as fromAuth from '../modules/auth/state/auth.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromProduct from 'src/app/modules/products/state/product.reducers';
import * as fromOrder from 'src/app/modules/orders/state/order.reducers';
import * as fromUser from 'src/app/modules/auth/state/user.reducers';
import * as fromTicket from 'src/app/pages/customer-support/state/ticket.reducers';

export interface AppState {
  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromProduct.productsFeatureKey]: fromProduct.State;
  [fromOrder.ordersFeatureKey]: fromOrder.State;
  [fromUser.usersFeatureKey]: fromUser.State;
  [fromTicket.ticketsFeatureKey]: fromTicket.State;
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCustomerSupport.customerSupportFeatureKey]: fromCustomerSupport.reducers,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromProduct.productsFeatureKey]: fromProduct.reducer,
  [fromOrder.ordersFeatureKey]: fromOrder.reducer,
  [fromUser.usersFeatureKey]: fromUser.reducer,
  [fromTicket.ticketsFeatureKey]: fromTicket.reducer,
  router: fromRouter.routerReducer,
};
