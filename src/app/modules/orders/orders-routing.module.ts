import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';
import { AuthGuard } from 'src/app/modules/auth/resources/auth.guard';
import { MyOrdersComponent } from 'src/app/modules/orders/myorders/myorders.component';
import { AdminOrdersComponent } from 'src/app/modules/orders/admin-orders/admin-orders.component';
import { AdminDeliveryComponent } from 'src/app/modules/orders/admin-delivery/admin-delivery.component';
import { OrderComponent } from 'src/app/modules/orders/order/order.component';
import { DeliveryNoteComponent } from 'src/app/modules/orders/delivery-note/delivery-note.component';
import { OrderEditComponent } from 'src/app/modules/orders/order-edit/order-edit.component';

const routes: Routes = [
  { path: 'myorders', canActivate: [AuthGuard], component: MyOrdersComponent },

  { path: 'order/:id', component: OrderComponent },
  {
    path: 'deliverynote/:id',
    component: DeliveryNoteComponent,
  },

  {
    path: 'orderlist',
    canActivate: [AdminGuard],
    component: AdminOrdersComponent,
  },
  {
    path: 'order/edit/:id',
    canActivate: [AdminGuard],
    component: OrderEditComponent,
  },
  {
    path: 'deliverylist',
    canActivate: [AdminGuard],
    component: AdminDeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
