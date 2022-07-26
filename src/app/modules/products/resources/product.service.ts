import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/products/resources/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get('/api/products');
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`/api/products/${id}`);
  }

  createProduct(
    name: string,
    description: string,
    price: number,
    quantity: number,
    imageUrl: string
  ): Observable<any> {
    return this.http.post<Product>('/api/products', {
      name,
      description,
      price,
      quantity,
      imageUrl,
    });
  }

  updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    imageUrl: string
  ): Observable<Product> {
    return this.http.put<Product>(`/api/products/${id}`, {
      name,
      description,
      price,
      quantity,
      imageUrl,
    });
  }

  removeProduct(productId: string) {
    return this.http.delete<Product>(`/api/products/${productId}`);
  }
}
