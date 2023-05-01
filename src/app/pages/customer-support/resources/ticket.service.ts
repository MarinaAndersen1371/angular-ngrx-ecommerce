import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  getTickets(): Observable<any> {
    return this.http.get<any>('/api/tickets');
  }

  getTicket(_id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`/api/tickets/${_id}`);
  }

  openTicket(_id: string): Observable<Ticket> {
    return this.http.put<Ticket>(`/api/tickets/${_id}/open`, {});
  }

  updateTicket(
    _id: string,
    commentAdmin: string,
    timeAdmin: number,
    status: string
  ): Observable<Ticket> {
    return this.http.put<Ticket>(`/api/tickets/${_id}`, {
      commentAdmin,
      timeAdmin,
      status,
    });
  }

  updateManagerTicket(
    _id: string,
    commentManager: string,
    timeManager: number,
    status: string
  ): Observable<Ticket> {
    return this.http.put<Ticket>(`/api/tickets/${_id}/manager`, {
      commentManager,
      timeManager,
      status,
    });
  }

  removeTicket(ticketId: string) {
    return this.http.delete(`/api/tickets/${ticketId}`);
  }
}
