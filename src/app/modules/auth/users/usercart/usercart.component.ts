import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  faStoreAlt,
  faBoxOpen,
  faTrash,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { User } from 'src/app/modules/auth/resources/auth';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.scss'],
})
export class UserCartComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  faArrowRight = faArrowRight;
  faStoreAlt = faStoreAlt;
  faBoxOpen = faBoxOpen;
  faTrash = faTrash;
  userId!: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const user: User =
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      this.userId = user._id;
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(fromUserActions.loadUser({ _id: this.userId }));
    }
  }

  deleteItem(product: any): void {
    if (this.userId) {
      if (confirm('Are you sure?')) {
        this.store.dispatch(
          fromUserActions.removeFromCart({ _id: this.userId, item: product })
        );
      }
    }
  }
}
