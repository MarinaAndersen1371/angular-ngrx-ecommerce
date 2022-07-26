import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

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
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faHome = faHome;
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

  payOrder() {
    this.store.dispatch(
      fromOrderActions.updateOrderToPaid({ _id: this.orderId })
    );
    this.store.dispatch(fromOrderActions.loadOrder({ _id: this.orderId }));
  }
}
