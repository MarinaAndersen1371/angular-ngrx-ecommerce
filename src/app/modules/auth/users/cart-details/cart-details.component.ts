import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { User } from 'src/app/modules/auth/resources/auth';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  _id!: any;
  isPrime!: boolean;
  isFranchise!: boolean;
  cart = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    delivery: '',
    method: '',
    account: '',
  };

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    const user: User =
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      this._id = user._id;
      this.isPrime = user.isPrime;
      this.isFranchise = user.isFranchise;
    }
  }

  onSubmit(f: NgForm) {
    this.cart = {
      name: f.value.name,
      address: f.value.address,
      city: f.value.city,
      postalCode: f.value.postalCode,
      country: f.value.country,
      delivery: f.value.delivery,
      method: f.value.method,
      account: f.value.account,
    };
    localStorage.setItem('cart', JSON.stringify(this.cart));

    if (this.isPrime && this.isFranchise) {
      this.router.navigate([`/auth/cartcheckout/${this._id}`]);
    } else {
      this.router.navigate([`/auth/cartsubscription/${this._id}`]);
    }
  }
}
