import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromMailActions from 'src/app/modules/mails/state/mail.actions';
import * as fromMailSelectors from 'src/app/modules/mails/state/mail.selectors';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
  vm$!: Observable<fromMailSelectors.MailViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faArrowLeft = faArrowLeft;
  faStar = faStar;
  mailId!: any;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.mailId = this.route.snapshot.paramMap.get('id');
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );

    if (this.mailId) {
      this.vm$ = this.store.pipe(select(fromMailSelectors.selectMailViewModel));
      this.store.dispatch(fromMailActions.loadMail({ _id: this.mailId }));
    }
  }
}
