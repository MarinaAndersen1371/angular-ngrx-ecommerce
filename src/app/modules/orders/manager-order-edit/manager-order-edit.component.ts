import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-manager-order-edit',
  templateUrl: './manager-order-edit.component.html',
  styleUrls: ['./manager-order-edit.component.scss'],
})
export class ManagerOrderEditComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  faArrowLeft = faArrowLeft;
  orderId!: string | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }

  sendOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateOrderToSent({ _id: this.orderId })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }

  deliverOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateOrderToDelivered({ _id: this.orderId })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }

  sendInvoice() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateInvoiceToSent({ _id: this.orderId })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }

  returnReceived() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateReturnToReceived({ _id: this.orderId })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }

  refundPaid() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateRefundToPaid({ _id: this.orderId })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }

  returnClosed() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateReturnToClosed({ _id: this.orderId })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({ _id: this.orderId })
      );
    }
  }
}
