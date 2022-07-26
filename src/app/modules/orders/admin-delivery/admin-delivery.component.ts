import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch,
  faTimes,
  faBoxOpen,
  faStoreAlt,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-delivery',
  templateUrl: './admin-delivery.component.html',
  styleUrls: ['./admin-delivery.component.scss'],
})
export class AdminDeliveryComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  faSearch = faSearch;
  faTimes = faTimes;
  faBoxOpen = faBoxOpen;
  faStoreAlt = faStoreAlt;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(fromOrderActions.loadAdminOrders());
  }
}
