import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch,
  faEdit,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerUsers } from 'src/app/modules/auth/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss'],
})
export class ManagerListComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UsersViewModel>;
  faSearch = faSearch;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(fromUserSelectors.selectUsersViewModel));
    this.store.dispatch(loadManagerUsers());
  }
}
