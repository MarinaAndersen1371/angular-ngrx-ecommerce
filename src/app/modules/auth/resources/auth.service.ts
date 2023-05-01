import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/modules/auth/resources/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/users/login', { email, password });
  }

  register(
    firstName: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    purpose: string,
    birthday: string,
    gender: string
  ): Observable<User> {
    return this.http.post<User>('/api/users', {
      firstName,
      username,
      email,
      password,
      phone,
      purpose,
      birthday,
      gender,
    });
  }
}
