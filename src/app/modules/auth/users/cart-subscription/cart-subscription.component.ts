import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { User } from 'src/app/modules/auth/resources/auth';

@Component({
  selector: 'app-cart-subscription',
  templateUrl: './cart-subscription.component.html',
  styleUrls: ['./cart-subscription.component.scss'],
})
export class CartSubscriptionComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  _id!: any;
  isPrime!: boolean;
  isFranchise!: boolean;
  testPaid!: boolean;
  subscription = {};
  ngSelectPrime = 'No';
  ngSelectFranchise = 'No';

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    const user: User =
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      this._id = user._id;
      this.isPrime = user.isPrime;
      this.isFranchise = user.isFranchise;
      this.testPaid = user.testPaid;
    }
  }

  onSubmit(f: NgForm) {
    this.subscription = {
      prime: f.value.prime,
      franchise: f.value.franchise,
    };
    localStorage.setItem('subscription', JSON.stringify(this.subscription));
    this.router.navigate([`/auth/cartcheckout/${this._id}`]);
  }
}
