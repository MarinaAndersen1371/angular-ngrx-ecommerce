import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/auth/resources/user.service';
import { updateUser } from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
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

  onSubmit() {
    this.store.dispatch(
      updateUser({
        _id: this.userId,
        firstName: this.model.firstName,
        username: this.model.username,
        email: this.model.email,
        phone: this.model.phone,
        purpose: this.model.purpose,
        birthday: this.model.birthday,
        gender: this.model.gender,
        isPrime: this.model.isPrime,
        coupon: this.model.coupon,
        testPaid: this.model.testPaid,
        testScore: this.model.testScore,
        isFranchise: this.model.isFranchise,
        isManager: this.model.isManager,
      })
    );
  }
}
