import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowLeft,
  faHome,
  faUserTie,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faHome = faHome;
  faUserTie = faUserTie;
  faUser = faUser;
  userId!: any;
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(fromUserActions.loadUser({ _id: this.userId }));
    }
  }
}
