import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { User } from 'src/app/modules/auth/resources/auth';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss'],
})
export class CartCheckoutComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  name!: string;
  address!: string;
  city!: string;
  postalCode!: string;
  country!: string;
  delivery!: string;
  account!: string;
  method!: string;
  prime!: string;
  franchise!: string;
  userId!: any;
  itemsPrice: any;
  shippingPrice!: any;
  taxPrice!: any;
  primePrice!: any;
  franchisePrice!: any;
  totalPrice!: any;

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

    const cart: any = JSON.parse(localStorage.getItem('cart') || '');
    if (cart) {
      this.name = cart.name;
      this.address = cart.address;
      this.city = cart.city;
      this.postalCode = cart.postalCode;
      this.country = cart.country;
      this.delivery = cart.delivery && (cart.delivery === 'Fastest' ? 10 : 5);
      this.account = cart.account;
      this.method = cart.method;
    }

    const subscription: any = JSON.parse(
      localStorage.getItem('subscription') || ''
    );
    if (subscription) {
      this.prime = subscription.prime;
      this.franchise = subscription.franchise;
    }

    this.primePrice = this.prime === 'Yes' ? 70 : 0;
    this.franchisePrice = this.franchise === 'Yes' ? 500 : 0;
  }

  placeOrder() {
    if (this.userId) {
      this.store.dispatch(
        fromOrderActions.createOrder({
          _id: this.userId,
          name: this.name,
          address: this.address,
          city: this.city,
          postalCode: this.postalCode,
          country: this.country,
          delivery: this.delivery,
          account: this.account,
          method: this.method,
          prime: this.prime,
          franchise: this.franchise,
        })
      );
    }
  }
}
