import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store';
import { loginPage } from 'src/app/modules/auth/state/auth.actions';

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
      loginPage({
        email: f.value.email,
        password: f.value.password,
      })
    );
  }
}
