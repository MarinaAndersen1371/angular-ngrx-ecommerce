import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faStar,
  faTrash,
  faSearch,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromMailActions from 'src/app/modules/mails/state/mail.actions';
import * as fromMailSelectors from 'src/app/modules/mails/state/mail.selectors';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-sent-mails',
  templateUrl: './sent-mails.component.html',
  styleUrls: ['./sent-mails.component.scss'],
})
export class SentMailsComponent implements OnInit {
  vm$!: Observable<fromMailSelectors.MailsViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faStar = faStar;
  faTrash = faTrash;
  faSearch = faSearch;
  faEdit = faEdit;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );

    this.vm$ = this.store.pipe(select(fromMailSelectors.selectMailsViewModel));
    this.store.dispatch(fromMailActions.loadMails());
  }

  deleteMailOut(_id: any) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(fromMailActions.deleteMailOut({ mailId: _id }));
    }
    this.store.dispatch(fromMailActions.loadMails());
  }
}
