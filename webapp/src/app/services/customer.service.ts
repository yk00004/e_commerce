import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = environment.api_url + '/customer';
  constructor(private http: HttpClient) {}
  get_fetureproduct() {
    return this.http.get<Product[]>(this.baseUrl + '/feature-product');
  }
  get_isnewproduct() {
    return this.http.get<Product[]>(this.baseUrl + '/isnew-product');
  }
  get_categories() {
    return this.http.get(this.baseUrl + '/categories');
  }
get_searched(
  search: string,
  categoryId: string,
  brandId?: string,
  sort?: 'price_asc' | 'price_desc'
) {
  const params: any = {
    search: search,
    categoryId: categoryId
  };

  if (brandId) {
    params.brandId = brandId;
  }

  if (sort) {
    params.sort = sort;
  }

  return this.http.get<Product[]>(this.baseUrl + "/products", { params });
}


}
