import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  getTickets(): Observable<any> {
    return this.http.get('/api/tickets');
  }

  getTicket(_id: string): Observable<any> {
    return this.http.get(`/api/tickets/${_id}`);
  }

  openTicket(_id: string): Observable<any> {
    return this.http.put(`/api/tickets/${_id}/open`, {});
  }

  updateTicket(
    _id: string,
    commentAdmin: string,
    status: string
  ): Observable<any> {
    return this.http.put(`/api/tickets/${_id}`, { commentAdmin, status });
  }

  removeTicket(ticketId: any) {
    return this.http.delete(`/api/tickets/${ticketId}`);
  }
}
