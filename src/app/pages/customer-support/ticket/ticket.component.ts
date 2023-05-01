import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromTicketActions from 'src/app/pages/customer-support/state/ticket.actions';
import * as fromTicketSelectors from 'src/app/pages/customer-support/state/ticket.selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  vm$!: Observable<fromTicketSelectors.TicketViewModel>;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  ticketId!: any;
  ngSelectStatus = 'New';

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');

    if (this.ticketId) {
      this.vm$ = this.store.pipe(
        select(fromTicketSelectors.selectTicketViewModel)
      );
      this.store.dispatch(fromTicketActions.loadTicket({ _id: this.ticketId }));
    }
  }

  openTicket() {
    this.store.dispatch(fromTicketActions.openTicket({ _id: this.ticketId }));
    this.store.dispatch(fromTicketActions.loadTicket({ _id: this.ticketId }));
  }

  onSubmit(f: NgForm) {
    if (this.ticketId) {
      this.store.dispatch(
        fromTicketActions.updateTicket({
          _id: this.ticketId,
          commentAdmin: f.value.commentAdmin,
          timeAdmin: f.value.timeAdmin,
          status: f.value.status,
        })
      );
    }
  }
}
