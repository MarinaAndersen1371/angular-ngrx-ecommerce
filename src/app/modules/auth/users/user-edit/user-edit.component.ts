import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/auth/resources/user.service';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  model: any = {};
  userId!: any;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
    this.userId = this.route.snapshot.paramMap.get('id');
    this.service.getUser(this.userId).subscribe((user) => (this.model = user));
  }

  onSubmit() {
    this.store.dispatch(
      fromUserActions.updateUser({
        _id: this.userId,
        firstName: this.model.firstName,
        username: this.model.username,
        email: this.model.email,
        phone: this.model.phone,
        purpose: this.model.purpose,
        birthday: this.model.birthday,
        gender: this.model.gender,
      })
    );
  }
}
