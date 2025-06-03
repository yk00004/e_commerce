import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.api_url + '/order';

  constructor(private http: HttpClient) {}

  get_order(){
    return this.http.get(this.baseUrl+"/");
  }
  add_order(ordervalyu:any){
    return this.http.post(this.baseUrl+"/",{ordervalyu});
  }


}
