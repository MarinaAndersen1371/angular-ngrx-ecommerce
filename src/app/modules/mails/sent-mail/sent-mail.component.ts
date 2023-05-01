import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AppState } from 'src/app/store';
import * as fromMailActions from 'src/app/modules/mails/state/mail.actions';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-sent-mail',
  templateUrl: './sent-mail.component.html',
  styleUrls: ['./sent-mail.component.scss'],
})
export class SentMailComponent implements OnInit {
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  onSubmit(f: NgForm, userId: string) {
    this.store.dispatch(
      fromMailActions.sendMail({
        mailTarget: f.value.mailTarget,
        subject: f.value.subject,
        message: f.value.message,
        userId: userId,
      })
    );
    f.reset();
  }
}
