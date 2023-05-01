import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  faArrowLeft,
  faEdit,
  faArrowRight,
  faLock,
  faEnvelopeSquare,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/auth/resources/user.service';
import { randomString } from 'src/app/modules/auth/resources/helpers';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.scss'],
})
export class ManagerEditComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faArrowRight = faArrowRight;
  faEnvelopeSquare = faEnvelopeSquare;
  faLock = faLock;
  model: any = {};
  userId!: any;
  generatedCoupon: any = '';
  reset: boolean = false;
  randomString = randomString;

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

  updateTestScore() {
    this.store.dispatch(
      fromUserActions.updateTestScore({
        _id: this.userId,
        testScore: this.model.testScore,
      })
    );
  }

  updateUserCoupon() {
    this.store.dispatch(
      fromUserActions.updateUserCoupon({
        _id: this.userId,
        coupon: this.model.coupon,
      })
    );
  }

  onClick() {
    this.generatedCoupon = this.randomString(10);
  }

  resetPassword() {
    this.store.dispatch(
      fromUserActions.resetPassword({
        _id: this.userId,
      })
    );
    this.reset = true;
  }
}
