import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fromOrder from 'src/app/modules/orders/state/order.reducers';
import { OrderEffects } from 'src/app/modules/orders/state/order.effects';
import { OrdersRoutingModule } from 'src/app/modules/orders/orders-routing.module';
import { MyOrdersComponent } from 'src/app/modules/orders/myorders/myorders.component';
import { OrderComponent } from 'src/app/modules/orders/order/order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminOrdersComponent } from 'src/app/modules/orders/admin-orders/admin-orders.component';
import { OrderEditComponent } from 'src/app/modules/orders/order-edit/order-edit.component';
import { DeliveryNoteComponent } from 'src/app/modules/orders/delivery-note/delivery-note.component';
import { AdminDeliveryComponent } from 'src/app/modules/orders/admin-delivery/admin-delivery.component';
import { ManagerOrdersComponent } from 'src/app/modules/orders/manager-orders/manager-orders.component';
import { ManagerDeliveryComponent } from 'src/app/modules/orders/manager-delivery/manager-delivery.component';
import { ManagerOrderEditComponent } from 'src/app/modules/orders/manager-order-edit/manager-order-edit.component';
import { AdminOrderComponent } from 'src/app/modules/orders/admin-order/admin-order.component';
import { ManagerOrderComponent } from 'src/app/modules/orders/manager-order/manager-order.component';
import { AdminDeliverynoteComponent } from 'src/app/modules/orders/admin-deliverynote/admin-deliverynote.component';
import { ManagerDeliverynoteComponent } from 'src/app/modules/orders/manager-deliverynote/manager-deliverynote.component';
import { InvoiceComponent } from 'src/app/modules/orders/invoice/invoice.component';
import { AdminInvoiceComponent } from 'src/app/modules/orders/admin-invoice/admin-invoice.component';
import { ManagerInvoiceComponent } from 'src/app/modules/orders/manager-invoice/manager-invoice.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { OrderReturnComponent } from './order-return/order-return.component';
import { ManagerReturnComponent } from './manager-return/manager-return.component';
import { ManagerReturnsComponent } from './manager-returns/manager-returns.component';
import { AdminReturnComponent } from './admin-return/admin-return.component';
import { AdminReturnsComponent } from './admin-returns/admin-returns.component';
import { OrderDeviceComponent } from './order-device/order-device.component';
import { AdminDeviceComponent } from './admin-device/admin-device.component';
import { ManagerDeviceComponent } from './manager-device/manager-device.component';
import { AdminDevicesComponent } from './admin-devices/admin-devices.component';
import { ManagerDevicesComponent } from './manager-devices/manager-devices.component';
import { AdminVouchersComponent } from './admin-vouchers/admin-vouchers.component';
import { ManagerVouchersComponent } from './manager-vouchers/manager-vouchers.component';
import { AdminPackagesComponent } from './admin-packages/admin-packages.component';
import { ManagerPackagesComponent } from './manager-packages/manager-packages.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { ManagerOverviewComponent } from './manager-overview/manager-overview.component';

@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderComponent,
    AdminOrdersComponent,
    OrderEditComponent,
    DeliveryNoteComponent,
    AdminDeliveryComponent,
    ManagerOrdersComponent,
    ManagerDeliveryComponent,
    ManagerOrderEditComponent,
    AdminOrderComponent,
    ManagerOrderComponent,
    AdminDeliverynoteComponent,
    ManagerDeliverynoteComponent,
    InvoiceComponent,
    AdminInvoiceComponent,
    ManagerInvoiceComponent,
    ReturnRequestComponent,
    OrderReturnComponent,
    ManagerReturnComponent,
    ManagerReturnsComponent,
    AdminReturnComponent,
    AdminReturnsComponent,
    OrderDeviceComponent,
    AdminDeviceComponent,
    ManagerDeviceComponent,
    AdminDevicesComponent,
    ManagerDevicesComponent,
    AdminVouchersComponent,
    ManagerVouchersComponent,
    AdminPackagesComponent,
    ManagerPackagesComponent,
    AdminOverviewComponent,
    ManagerOverviewComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    OrdersRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
})
export class OrdersModule {}
