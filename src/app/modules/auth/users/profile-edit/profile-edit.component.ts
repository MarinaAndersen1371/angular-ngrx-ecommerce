import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/auth/resources/user.service';
import { updateProfile } from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  model: any = {};
  userId!: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.service
        .getUser(this.userId)
        .subscribe((user) => (this.model = user));
    }
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(
      updateProfile({
        _id: this.userId,
        firstName: this.model.firstName,
        username: this.model.username,
        email: this.model.email,
        password: f.value.password,
        phone: this.model.phone,
        purpose: this.model.purpose,
        birthday: this.model.birthday,
        gender: this.model.gender,
      })
    );
  }
}
