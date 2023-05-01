import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerOrders } from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-manager-packages',
  templateUrl: './manager-packages.component.html',
  styleUrls: ['./manager-packages.component.scss'],
})
export class ManagerPackagesComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  faSearch = faSearch;
  faBoxOpen = faBoxOpen;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(loadManagerOrders());
  }
}
