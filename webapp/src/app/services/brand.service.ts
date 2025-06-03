import { Brand } from './../types/brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = environment.api_url+'/brand';
  constructor(private http:HttpClient) { }
  get_brand(){
    return this.http.get<Brand[]>(this.baseUrl)
  }
  add_brand(name:String){
    return this.http.post(this.baseUrl,{name:name})
  }
  delete_brand(id:String){
    return this.http.delete(this.baseUrl+"/"+id)
  }
  get_brand_byid(id:string){
    return this.http.get<Brand>(this.baseUrl+"/"+id)
  }
  update_brand_byid(id:string,name:string){
    return this.http.put(this.baseUrl+"/"+id,{name:name})
  }
}
