import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faArrowRight = faArrowRight;
  faCheck = faCheck;
  orderId!: string | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      this.vmUser$ = this.store.pipe(
        select(fromAuthSelectors.selectAuthLinksViewModel)
      );
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(fromOrderActions.loadOrder({ _id: this.orderId }));
    }
  }

  payOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateOrderToPaid({ _id: this.orderId })
      );
    }
  }

  submitVoucher(userId: string, f: NgForm) {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateCustomerVoucher({
          _id: this.orderId,
          userId,
          voucher: f.value.voucher,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId })
      );
    }
  }
}
