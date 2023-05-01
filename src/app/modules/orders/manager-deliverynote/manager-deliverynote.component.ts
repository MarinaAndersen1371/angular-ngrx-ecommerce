import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  faTimes,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerOrder } from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-manager-deliverynote',
  templateUrl: './manager-deliverynote.component.html',
  styleUrls: ['./manager-deliverynote.component.scss'],
})
export class ManagerDeliverynoteComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  faTimes = faTimes;
  faCheck = faCheck;
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
