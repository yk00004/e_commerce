import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.api_url+'/product';

  constructor(private http:HttpClient) { }
  
  get_product(){
    return this.http.get<Product[]>(this.baseUrl)
  }
  add_product(model:Product){
    return this.http.post(this.baseUrl,model)
  }

  delete_product(id:String){
    return this.http.delete(this.baseUrl+"/"+id)
  }
  get_product_byid(id:string){
    return this.http.get<Product>(this.baseUrl+"/"+id)
  }
  update_product_byid(id:string,model:Product){
    return this.http.put(this.baseUrl+"/"+id,model)
  }
}
