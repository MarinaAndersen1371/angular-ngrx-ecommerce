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

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  createProduct(
    name: string,
    brand: string,
    category: string,
    description: string,
    pricePurchase: number,
    price: number,
    quantity: number,
    extra: boolean,
    imageUrl: string,
    modifiedBy: string
  ): Observable<Product> {
    return this.http.post<Product>('/api/products', {
      name,
      brand,
      category,
      description,
      pricePurchase,
      price,
      quantity,
      extra,
      imageUrl,
      modifiedBy,
    });
  }

  updateProduct(
    id: string,
    name: string,
    brand: string,
    category: string,
    description: string,
    pricePurchase: number,
    price: number,
    quantity: number,
    extra: boolean,
    imageUrl: string,
    modifiedBy: string
  ): Observable<Product> {
    return this.http.put<Product>(`/api/products/${id}`, {
      name,
      brand,
      category,
      description,
      pricePurchase,
      price,
      quantity,
      extra,
      imageUrl,
      modifiedBy,
    });
  }

  removeProduct(productId: string): Observable<Product> {
    return this.http.put<Product>(`/api/products/${productId}/deleted`, {});
  }

  reviewProduct(
    id: string,
    userName: string,
    userId: string,
    rating: number,
    comment: string
  ): Observable<Product> {
    return this.http.post<Product>(`/api/products/${id}/reviews`, {
      userName,
      userId,
      rating,
      comment,
    });
  }
}
