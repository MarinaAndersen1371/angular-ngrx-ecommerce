import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faTrash,
  faSearch,
  faEdit,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/auth/state/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UsersViewModel>;
  faTrash = faTrash;
  faSearch = faSearch;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(fromUserSelectors.selectUsersViewModel));
    this.store.dispatch(fromUserActions.loadUsers());
  }

  deleteUser(_id: any) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(fromUserActions.deleteUser({ userId: _id }));
    }
    this.store.dispatch(fromUserActions.loadUsers());
  }
}
