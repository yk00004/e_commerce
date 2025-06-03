import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = environment.api_url + '/wishlist';
  wishproduct:any;
  constructor(private http: HttpClient) {}
  init(){
    this.get_wishlist_product().subscribe((e)=>{
      this.wishproduct=e;
      // console.log(this.wishproduct);
    })
  }
  get_wishlist_product(){
    return this.http.get(this.baseUrl+"/");
  }
  add_product_wishlist(productId:string){
    // console.log(productId+"productId");

    return this.http.post(this.baseUrl+"/"+productId,{});
  }
  delete_product_wishlist(productId:string){
    return this.http.delete(this.baseUrl+"/"+productId);
  }
}
