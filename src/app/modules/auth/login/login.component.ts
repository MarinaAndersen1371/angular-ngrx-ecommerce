import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuthActions from 'src/app/modules/auth/state/auth.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    this.store.dispatch(
      fromAuthActions.loginPage({
        email: f.value.email,
        password: f.value.password,
      })
    );
  }
}
