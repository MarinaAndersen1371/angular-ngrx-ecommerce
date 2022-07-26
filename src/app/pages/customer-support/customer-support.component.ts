import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { sendMessage } from 'src/app/pages/customer-support/state/customer-support.actions';
import { AppState } from 'src/app/store';
import {
  CustomerSupportViewModel,
  selectCustomerSupportModel,
} from 'src/app/pages/customer-support/state/customer-support.selectors';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  vm$!: Observable<CustomerSupportViewModel>;

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(selectCustomerSupportModel));
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(
      sendMessage({
        name: f.value.name,
        email: f.value.email,
        message: f.value.message,
      })
    );
    f.reset();
  }
}
