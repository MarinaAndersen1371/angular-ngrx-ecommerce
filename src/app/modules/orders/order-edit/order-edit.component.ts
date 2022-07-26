import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  orderId!: any;
  vm$!: Observable<any>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
    this.vm$ = this.store.pipe(select(fromOrderSelectors.selectOrderViewModel));
    this.store.dispatch(fromOrderActions.loadOrder({ _id: this.orderId }));
  }

  sendOrder() {
    this.store.dispatch(
      fromOrderActions.updateOrderToSent({ _id: this.orderId })
    );
    this.store.dispatch(fromOrderActions.loadOrder({ _id: this.orderId }));
  }

  deliverOrder() {
    this.store.dispatch(
      fromOrderActions.updateOrderToDelivered({ _id: this.orderId })
    );
    this.store.dispatch(fromOrderActions.loadOrder({ _id: this.orderId }));
  }

  sendInvoice() {
    this.store.dispatch(
      fromOrderActions.updateInvoiceToSent({ _id: this.orderId })
    );
    this.store.dispatch(fromOrderActions.loadOrder({ _id: this.orderId }));
  }
}
