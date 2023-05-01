import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mail } from 'src/app/modules/mails/resources/mail';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  getMails(): Observable<any> {
    return this.http.get<any>('/api/mails');
  }

  getMail(_id: string): Observable<Mail> {
    return this.http.get<Mail>(`/api/mails/${_id}`);
  }

  statusMail(mailId: string): Observable<Mail> {
    return this.http.put<Mail>(`/api/mails/${mailId}`, {});
  }

  openMail(mailId: string): Observable<Mail> {
    return this.http.put<Mail>(`/api/mails/${mailId}/open`, {});
  }

  deleteIn(mailId: string): Observable<Mail> {
    return this.http.put<Mail>(`/api/mails/${mailId}/in`, {});
  }

  deleteOut(mailId: string): Observable<Mail> {
    return this.http.put<Mail>(`/api/mails/${mailId}/out`, {});
  }

  sendMail(
    userId: string,
    mailTarget: string,
    subject: string,
    message: string
  ): Observable<Mail> {
    return this.http.post<Mail>(`/api/mails`, {
      userId,
      mailTarget,
      subject,
      message,
    });
  }
}
