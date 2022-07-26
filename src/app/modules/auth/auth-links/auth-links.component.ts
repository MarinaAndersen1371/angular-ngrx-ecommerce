import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faUserShield,
  faUser,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/modules/auth/resources/auth.service';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';
import { logout } from 'src/app/modules/auth/state/auth.actions';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
  faUserShield = faUserShield;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;
  faUser = faUser;

  vm$!: Observable<fromAuthSelectors.AuthLinksViewModal>;

  constructor(
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  logout() {
    this.store.dispatch(logout());
  }
}
