import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.api_url+'/admin';
  constructor(private http:HttpClient) { }
   get_all_order(){
    return this.http.get(this.baseUrl+"/order");
  }
   change_order_status(orderId:string,status:string){
    return this.http.put(this.baseUrl+"/order/"+orderId,{status});
  }
   delete_order(orderId:string){
    return this.http.delete(this.baseUrl+"/order/"+orderId);
  }
}
