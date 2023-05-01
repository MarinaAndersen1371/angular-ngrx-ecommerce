import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';
import { AuthGuard } from 'src/app/modules/auth/resources/auth.guard';
import { ManagerGuard } from 'src/app/modules/auth/resources/manager.guard';
import { MyOrdersComponent } from 'src/app/modules/orders/myorders/myorders.component';
import { OrderComponent } from 'src/app/modules/orders/order/order.component';
import { InvoiceComponent } from 'src/app/modules/orders/invoice/invoice.component';
import { DeliveryNoteComponent } from 'src/app/modules/orders/delivery-note/delivery-note.component';
import { OrderReturnComponent } from 'src/app/modules/orders/order-return/order-return.component';
import { OrderDeviceComponent } from 'src/app/modules/orders/order-device/order-device.component';
import { ReturnRequestComponent } from 'src/app/modules/orders/return-request/return-request.component';
import { AdminOrdersComponent } from 'src/app/modules/orders/admin-orders/admin-orders.component';
import { AdminOrderComponent } from 'src/app/modules/orders/admin-order/admin-order.component';
import { AdminInvoiceComponent } from 'src/app/modules/orders/admin-invoice/admin-invoice.component';
import { AdminDeliveryComponent } from 'src/app/modules/orders/admin-delivery/admin-delivery.component';
import { AdminDeliverynoteComponent } from 'src/app/modules/orders/admin-deliverynote/admin-deliverynote.component';
import { OrderEditComponent } from 'src/app/modules/orders/order-edit/order-edit.component';
import { AdminReturnComponent } from 'src/app/modules/orders/admin-return/admin-return.component';
import { AdminDeviceComponent } from 'src/app/modules/orders/admin-device/admin-device.component';
import { AdminReturnsComponent } from 'src/app/modules/orders/admin-returns/admin-returns.component';
import { AdminDevicesComponent } from 'src/app/modules/orders/admin-devices/admin-devices.component';
import { AdminVouchersComponent } from 'src/app/modules/orders/admin-vouchers/admin-vouchers.component';
import { AdminPackagesComponent } from 'src/app/modules/orders/admin-packages/admin-packages.component';
import { AdminOverviewComponent } from 'src/app/modules/orders/admin-overview/admin-overview.component';
import { ManagerOrdersComponent } from 'src/app/modules/orders/manager-orders/manager-orders.component';
import { ManagerOrderComponent } from 'src/app/modules/orders/manager-order/manager-order.component';
import { ManagerInvoiceComponent } from 'src/app/modules/orders/manager-invoice/manager-invoice.component';
import { ManagerDeliveryComponent } from 'src/app/modules/orders/manager-delivery/manager-delivery.component';
import { ManagerDeliverynoteComponent } from 'src/app/modules/orders/manager-deliverynote/manager-deliverynote.component';
import { ManagerOrderEditComponent } from 'src/app/modules/orders/manager-order-edit/manager-order-edit.component';
import { ManagerReturnComponent } from 'src/app/modules/orders/manager-return/manager-return.component';
import { ManagerReturnsComponent } from 'src/app/modules/orders/manager-returns/manager-returns.component';
import { ManagerDeviceComponent } from 'src/app/modules/orders/manager-device/manager-device.component';
import { ManagerDevicesComponent } from 'src/app/modules/orders/manager-devices/manager-devices.component';
import { ManagerVouchersComponent } from 'src/app/modules/orders/manager-vouchers/manager-vouchers.component';
import { ManagerPackagesComponent } from 'src/app/modules/orders/manager-packages/manager-packages.component';
import { ManagerOverviewComponent } from 'src/app/modules/orders/manager-overview/manager-overview.component';

const routes: Routes = [
  //*********** User area ***/
  { path: 'myorders', canActivate: [AuthGuard], component: MyOrdersComponent },
  { path: 'order/:id', canActivate: [AuthGuard], component: OrderComponent },
  {
    path: 'invoice/:id',
    canActivate: [AuthGuard],
    component: InvoiceComponent,
  },
  {
    path: 'deliverynote/:id',
    canActivate: [AuthGuard],
    component: DeliveryNoteComponent,
  },
  {
    path: 'return-request/:id',
    canActivate: [AuthGuard],
    component: ReturnRequestComponent,
  },
  {
    path: 'return/:id',
    canActivate: [AuthGuard],
    component: OrderReturnComponent,
  },
  {
    path: 'device/:id',
    canActivate: [AuthGuard],
    component: OrderDeviceComponent,
  },
  //*********** Admin area ***/
  {
    path: 'admin/order/:id',
    canActivate: [AdminGuard],
    component: AdminOrderComponent,
  },
  {
    path: 'admin/invoice/:id',
    canActivate: [AdminGuard],
    component: AdminInvoiceComponent,
  },
  {
    path: 'admin/delivery/:id',
    canActivate: [AdminGuard],
    component: AdminDeliverynoteComponent,
  },
  {
    path: 'admin/return/:id',
    canActivate: [AdminGuard],
    component: AdminReturnComponent,
  },
  {
    path: 'admin/device/:id',
    canActivate: [AdminGuard],
    component: AdminDeviceComponent,
  },
  {
    path: 'order-list',
    canActivate: [AdminGuard],
    component: AdminOrdersComponent,
  },
  {
    path: 'delivery-list',
    canActivate: [AdminGuard],
    component: AdminDeliveryComponent,
  },
  {
    path: 'admin-returns',
    canActivate: [AdminGuard],
    component: AdminReturnsComponent,
  },
  {
    path: 'admin-devices',
    canActivate: [AdminGuard],
    component: AdminDevicesComponent,
  },
  {
    path: 'admin-vouchers',
    canActivate: [AdminGuard],
    component: AdminVouchersComponent,
  },
  {
    path: 'admin-packages',
    canActivate: [AdminGuard],
    component: AdminPackagesComponent,
  },
  {
    path: 'admin-overview',
    canActivate: [AdminGuard],
    component: AdminOverviewComponent,
  },
  {
    path: 'order/edit/:id',
    canActivate: [AdminGuard],
    component: OrderEditComponent,
  },
  //*********** Manager area ***/
  {
    path: 'manager/order/:id',
    canActivate: [ManagerGuard],
    component: ManagerOrderComponent,
  },
  {
    path: 'manager/invoice/:id',
    canActivate: [ManagerGuard],
    component: ManagerInvoiceComponent,
  },
  {
    path: 'manager/delivery/:id',
    canActivate: [ManagerGuard],
    component: ManagerDeliverynoteComponent,
  },
  {
    path: 'manager/return/:id',
    canActivate: [ManagerGuard],
    component: ManagerReturnComponent,
  },
  {
    path: 'manager/device/:id',
    canActivate: [ManagerGuard],
    component: ManagerDeviceComponent,
  },
  {
    path: 'manager/order/edit/:id',
    canActivate: [ManagerGuard],
    component: ManagerOrderEditComponent,
  },
  {
    path: 'manager/order-list',
    canActivate: [ManagerGuard],
    component: ManagerOrdersComponent,
  },
  {
    path: 'manager-returns',
    canActivate: [ManagerGuard],
    component: ManagerReturnsComponent,
  },
  {
    path: 'manager-devices',
    canActivate: [ManagerGuard],
    component: ManagerDevicesComponent,
  },
  {
    path: 'manager/delivery-list',
    canActivate: [ManagerGuard],
    component: ManagerDeliveryComponent,
  },
  {
    path: 'manager-vouchers',
    canActivate: [ManagerGuard],
    component: ManagerVouchersComponent,
  },
  {
    path: 'manager-packages',
    canActivate: [ManagerGuard],
    component: ManagerPackagesComponent,
  },
  {
    path: 'manager-overview',
    canActivate: [ManagerGuard],
    component: ManagerOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
