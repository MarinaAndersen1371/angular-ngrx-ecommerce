import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerSupportService {
  constructor(private http: HttpClient) {}

  ticket(name: string, email: string, message: string): Observable<any> {
    return this.http.post('/api/tickets', { name, email, message });
  }
}
