import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch,
  faTimes,
  faBoxOpen,
  faStoreAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  faSearch = faSearch;
  faTimes = faTimes;
  faBoxOpen = faBoxOpen;
  faStoreAlt = faStoreAlt;
  faEdit = faEdit;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(fromOrderActions.loadAdminOrders());
  }
}
