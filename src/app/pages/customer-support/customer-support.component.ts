import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { sendMessage } from 'src/app/pages/customer-support/state/customer-support.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

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
