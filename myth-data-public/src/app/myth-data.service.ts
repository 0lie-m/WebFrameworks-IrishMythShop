import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './data-list/data-list.component';

@Injectable()
export class MythDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getProducts(): Promise<Product[]> {
    const url = `${this.apiBaseUrl}/products`; // change if your endpoint is different
    return this.http
      .get<Product[]>(url)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
