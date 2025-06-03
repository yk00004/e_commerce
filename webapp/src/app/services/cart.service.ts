import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.api_url + '/cart';
  cartproduct: any;
  constructor(private http: HttpClient) {}
  init() {
    this.get_cart_product().subscribe((e) => {
      this.cartproduct = e;
      // console.log(this.cartproduct+"asdfdsf");


    });
  }
  get_cart_product() {
    return this.http.get(this.baseUrl + '/');
  }

  add_product_cart(productId: string, quantity: number = 1) {
    return this.http.post(this.baseUrl + '/' + productId, { quantity });
  }

  delete_product_cart(productId: string) {
    return this.http.delete(this.baseUrl + '/' + productId);
  }
  update_product_cart(productId: string ,quantity: number) {
    return this.http.put(this.baseUrl + '/' + productId,{quantity});
  }

}
