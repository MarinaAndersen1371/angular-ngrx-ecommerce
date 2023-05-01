import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowLeft,
  faArrowRight,
  faUserTie,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerUser } from 'src/app/modules/auth/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.scss'],
})
export class ManagerUserComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  faArrowLeft = faArrowLeft;
  faUserTie = faUserTie;
  faUser = faUser;
  faArrowRight = faArrowRight;
  userId!: any;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(loadManagerUser({ _id: this.userId }));
    }
  }
}
