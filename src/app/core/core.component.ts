import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/modules/auth/resources/auth';
import { AppState } from 'src/app/store';
import { browserReload } from 'src/app/modules/auth/state/auth.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  faPaperPlane = faPaperPlane;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const user: User =
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      this.store.dispatch(browserReload({ user: user }));
    }
  }
}
