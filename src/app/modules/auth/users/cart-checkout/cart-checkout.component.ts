import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { User } from 'src/app/modules/auth/resources/auth';
import { loadUser } from 'src/app/modules/auth/state/user.actions';
import { createOrder } from 'src/app/modules/orders/state/order.actions';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss'],
})
export class CartCheckoutComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  name!: string;
  address!: string;
  city!: string;
  postalCode!: string;
  country!: string;
  nameInvoice!: string;
  addressInvoice!: string;
  cityInvoice!: string;
  postalCodeInvoice!: string;
  countryInvoice!: string;
  delivery!: number;
  account!: string;
  method!: string;
  prime!: string;
  franchise!: string;
  userId!: any;
  itemsPrice!: number;
  shippingPrice!: number;
  taxPrice!: number;
  primePrice!: number;
  isPrime!: boolean;
  isFranchise!: boolean;
  franchisePrice!: number;
  totalPrice!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const user: User =
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      this.userId = user._id;
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(loadUser({ _id: this.userId }));
    }

    const cart: any = JSON.parse(localStorage.getItem('cart') || '');
    if (cart) {
      this.name = cart.name;
      this.address = cart.address;
      this.city = cart.city;
      this.postalCode = cart.postalCode;
      this.country = cart.country;
      this.delivery = cart.delivery && (cart.delivery === 'Fastest' ? 10 : 5);
      this.nameInvoice = cart.nameInvoice;
      this.addressInvoice = cart.addressInvoice;
      this.cityInvoice = cart.cityInvoice;
      this.postalCodeInvoice = cart.postalCodeInvoice;
      this.countryInvoice = cart.countryInvoice;
      this.account = cart.account;
      this.method = cart.method;
    }

    if (localStorage.getItem('subscription')) {
      const subscription: any = JSON.parse(
        localStorage.getItem('subscription') || ''
      );
      this.prime = subscription.prime;
      this.franchise = subscription.franchise;
    } else {
      this.prime = 'No';
      this.franchise = 'No';
    }

    this.primePrice = this.prime === 'Yes' ? 70 : 0;
    this.franchisePrice = this.franchise === 'Yes' ? 500 : 0;
  }

  placeOrder() {
    if (this.userId) {
      this.store.dispatch(
        createOrder({
          _id: this.userId,
          name: this.name,
          address: this.address,
          city: this.city,
          postalCode: this.postalCode,
          country: this.country,
          delivery: this.delivery,
          nameInvoice: this.nameInvoice,
          addressInvoice: this.addressInvoice,
          cityInvoice: this.cityInvoice,
          postalCodeInvoice: this.postalCodeInvoice,
          countryInvoice: this.countryInvoice,
          account: this.account,
          method: this.method,
          prime: this.prime,
          franchise: this.franchise,
        })
      );
    }
  }
}
