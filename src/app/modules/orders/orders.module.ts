import { NgModule } from '@angular/core';
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
import { OrderEditComponent } from './order-edit/order-edit.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { AdminDeliveryComponent } from './admin-delivery/admin-delivery.component';

@NgModule({
  declarations: [MyOrdersComponent, OrderComponent, AdminOrdersComponent, OrderEditComponent, DeliveryNoteComponent, AdminDeliveryComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
})
export class OrdersModule {}
