import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modules/orders/resources/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getMyOrders(): Observable<any> {
    return this.http.get('/api/orders');
  }

  getAdminOrders(): Observable<any> {
    return this.http.get('/api/orders/admin');
  }

  getOrder(_id: string): Observable<any> {
    return this.http.get(`/api/orders/${_id}`);
  }

  createOrder(
    _id: any,
    name: string,
    delivery: any,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    method: string,
    account: string,
    prime: string,
    franchise: string
  ): Observable<any> {
    return this.http.post<Order>('/api/orders', {
      _id,
      name,
      delivery,
      address,
      city,
      postalCode,
      country,
      method,
      account,
      prime,
      franchise,
    });
  }

  updateOrderToPaid(_id: string): Observable<any> {
    return this.http.put(`/api/orders/${_id}/paid`, {});
  }

  updateOrderToSent(_id: string): Observable<any> {
    return this.http.put(`/api/orders/${_id}/sent`, {});
  }

  updateOrderToDelivered(_id: string): Observable<any> {
    return this.http.put(`/api/orders/${_id}/deliver`, {});
  }

  updateInvoiceToSent(_id: string): Observable<any> {
    return this.http.put(`/api/orders/${_id}/invoice`, {});
  }
}
