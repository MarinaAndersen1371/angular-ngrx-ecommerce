import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import { registerPage } from 'src/app/modules/auth/state/auth.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  ngSelectPurpose = 'Other';
  ngSelectGender = 'Male';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    this.store.dispatch(
      registerPage({
        firstName: f.value.firstName,
        username: f.value.username,
        email: f.value.email,
        password: f.value.password,
        phone: f.value.phone,
        purpose: f.value.purpose,
        birthday: f.value.birthday,
        gender: f.value.gender,
      })
    );
  }
}
