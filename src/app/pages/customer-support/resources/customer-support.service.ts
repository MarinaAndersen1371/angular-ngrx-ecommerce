import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/pages/customer-support/resources/customer-message';

@Injectable({ providedIn: 'root' })
export class CustomerSupportService {
  constructor(private http: HttpClient) {}

  ticket(name: string, email: string, message: string): Observable<Ticket> {
    return this.http.post<Ticket>('/api/tickets', { name, email, message });
  }
}
