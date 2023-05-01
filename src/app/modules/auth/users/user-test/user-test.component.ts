import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  faArrowLeft,
  faArrowRight,
  faEdit,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/auth/resources/user.service';
import { updateUserTest } from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss'],
})
export class UserTestComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faEdit = faEdit;
  faCheck = faCheck;
  active = 1;
  userId!: any;
  model: any = {};
  test1!: '';
  test2!: '';
  test3!: '';
  test4!: '';
  test5!: '';

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
      updateUserTest({
        _id: this.userId,
        test1: this.model.test.test1,
        test2: this.model.test.test2,
        test3: this.model.test.test3,
        test4: this.model.test.test4,
        test5: this.model.test.test5,
      })
    );
  }
}
