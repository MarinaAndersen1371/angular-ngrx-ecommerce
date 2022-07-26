import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  getUser(_id: any): Observable<any> {
    return this.http.get(`/api/users/${_id}`);
  }

  removeUser(userId: any) {
    return this.http.delete(`/api/users/${userId}`);
  }

  updateUser(
    _id: any,
    firstName: string,
    username: string,
    email: string,
    phone: string,
    purpose: string,
    birthday: string,
    gender: string
  ) {
    return this.http.put(`/api/users/${_id}/edit`, {
      firstName,
      username,
      email,
      phone,
      purpose,
      birthday,
      gender,
    });
  }

  updateProfile(
    _id: any,
    firstName: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    purpose: string,
    birthday: string,
    gender: string
  ) {
    return this.http.put(`/api/users/${_id}/profile`, {
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

  addToCart(
    _id: any,
    item: any,
    qty: number,
    warranty: string,
    gift: string
  ): Observable<any> {
    return this.http.put(`/api/users/${_id}`, { item, qty, warranty, gift });
  }

  removeFromCart(_id: any, item: any): Observable<any> {
    return this.http.put(`/api/users/${_id}/remove`, { item });
  }
}
