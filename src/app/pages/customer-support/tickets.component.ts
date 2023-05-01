import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faTrash,
  faSearch,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromTicketActions from 'src/app/pages/customer-support/state/ticket.actions';
import * as TicketSelector from 'src/app/pages/customer-support/state/ticket.selectors';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  vm$!: Observable<TicketSelector.TicketsViewModel>;
  faTrash = faTrash;
  faSearch = faSearch;
  faBoxOpen = faBoxOpen;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(TicketSelector.selectTicketsViewModel));
    this.store.dispatch(fromTicketActions.loadTickets());
  }

  deleteTicket(_id: any) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(fromTicketActions.deleteTicket({ ticketId: _id }));
    }
    this.store.dispatch(fromTicketActions.loadTickets());
  }
}
