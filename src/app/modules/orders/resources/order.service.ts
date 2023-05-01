import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modules/orders/resources/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>('/api/orders');
  }

  getOrder(_id: string): Observable<Order> {
    return this.http.get<Order>(`/api/orders/${_id}`);
  }

  createOrder(
    _id: string,
    name: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    delivery: any,
    nameInvoice: string,
    addressInvoice: string,
    cityInvoice: string,
    postalCodeInvoice: string,
    countryInvoice: string,
    method: string,
    account: string,
    prime: string,
    franchise: string
  ): Observable<Order> {
    return this.http.post<Order>('/api/orders', {
      _id,
      name,
      address,
      city,
      postalCode,
      country,
      delivery,
      nameInvoice,
      addressInvoice,
      cityInvoice,
      postalCodeInvoice,
      countryInvoice,
      method,
      account,
      prime,
      franchise,
    });
  }

  updateOrderToPaid(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/paid`, {});
  }

  updateCustomerVoucher(
    _id: string,
    userId: string,
    voucher: string
  ): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/voucher`, {
      userId,
      voucher,
    });
  }

  updateOrderToSent(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/sent`, {});
  }

  updateOrderToDelivered(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/deliver`, {});
  }

  updateInvoiceToSent(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/invoice`, {});
  }

  requestReturn(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/requestreturn`, {});
  }

  updateReturnToReceived(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/returnreceived`, {});
  }

  updateRefundToPaid(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/refund`, {});
  }

  updateReturnToClosed(_id: string): Observable<Order> {
    return this.http.put<Order>(`/api/orders/${_id}/returnclosed`, {});
  }
}
