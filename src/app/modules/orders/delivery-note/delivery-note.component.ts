import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  faTimes,
  faArrowRight,
  faHome,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadOrder } from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.scss'],
})
export class DeliveryNoteComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faTimes = faTimes;
  faCheck = faCheck;
  faArrowRight = faArrowRight;
  faHome = faHome;
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
      this.store.dispatch(loadOrder({ _id: this.orderId }));
    }
  }
}
