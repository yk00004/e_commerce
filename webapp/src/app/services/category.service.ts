import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../types/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.api_url+'/category';
  constructor(private http:HttpClient) { }
  getcategories(){
    return this.http.get<Category[]>(this.baseUrl)
  }
  addcategory(name:String){
    return this.http.post(this.baseUrl,{name:name})
  }
  deletecategory(id:String){
    return this.http.delete(this.baseUrl+"/"+id)
  }
  getcategorybyid(id:string){
    return this.http.get<Category>(this.baseUrl+"/"+id)
  }
  updatecategorybyid(id:string,name:string){
    return this.http.put(this.baseUrl+"/"+id,{name:name})
  }
}
