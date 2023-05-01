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
import { loadMyOrders } from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faSearch = faSearch;
  faTimes = faTimes;
  faBoxOpen = faBoxOpen;
  faStoreAlt = faStoreAlt;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );

    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(loadMyOrders());
  }
}
