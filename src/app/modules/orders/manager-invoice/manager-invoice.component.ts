import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import { loadManagerOrder } from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-manager-invoice',
  templateUrl: './manager-invoice.component.html',
  styleUrls: ['./manager-invoice.component.scss'],
})
export class ManagerInvoiceComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  orderId!: string | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(loadManagerOrder({ _id: this.orderId }));
    }
  }
}
