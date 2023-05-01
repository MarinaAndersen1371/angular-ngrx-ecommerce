import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch,
  faBoxOpen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadUsers } from 'src/app/modules/auth/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';

@Component({
  selector: 'app-admin-franchiselist',
  templateUrl: './admin-franchiselist.component.html',
  styleUrls: ['./admin-franchiselist.component.scss'],
})
export class AdminFranchiselistComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UsersViewModel>;
  faSearch = faSearch;
  faBoxOpen = faBoxOpen;
  faTimes = faTimes;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(fromUserSelectors.selectUsersViewModel));
    this.store.dispatch(loadUsers());
  }
}
