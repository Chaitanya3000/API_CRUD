import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
  createdAt: string;
  product_name: string;
  product_image: string;
  product_type: string;
  cost: string;
  description: string;
  product_material: string;
  product: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private apiURL =
    'https://64a686f7096b3f0fcc7ff71c.mockapi.io/sample-angular-app/products';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  loadProductList() {
    const url = `${this.apiURL}`;
    return this.httpClient.get<Data[]>(url);
  }

  add(details: Data) {
    const url = `${this.apiURL}`;
    return this.httpClient.post<Data>(url, details, { headers: this.headers });
  }

  getProductById(productId: string): Observable<Data> {
    const url = `${this.apiURL}/${productId}`;
    return this.httpClient.get<Data>(url);
  }

  updateProduct(updatedProduct: Data): Observable<Data> {
    const url = `${this.apiURL}/${updatedProduct.id}`;
    return this.httpClient.put<Data>(url, updatedProduct, { headers: this.headers });
  }

  deleteProductById(productId: string): Observable<void> {
    const url = `${this.apiURL}/${productId}`;
    return this.httpClient.delete<void>(url);
  }
}
