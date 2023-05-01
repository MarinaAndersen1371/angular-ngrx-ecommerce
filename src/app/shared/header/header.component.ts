import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/modules/auth/resources/auth.service';
import { AppState } from 'src/app/store';
import { logout } from 'src/app/modules/auth/state/auth.actions';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HeaderComponent implements OnInit {
  vm$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faUserShield = faUserShield;
  status: boolean = false;

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
