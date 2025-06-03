import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl = environment.api_url+'/auth';
  constructor(private http:HttpClient) { }

  register(name:String,email:String,password:String){
    return this.http.post(this.baseUrl+"/register",{
      name:name,email:email,password:password
    })
  }
  login(email:String,password:String){
    return this.http.post(this.baseUrl+"/login",{
      email:email,password:password
    })
  }
  get islogedin(){
    let token=localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;

  }
  get isadmin(){
    let userdata=localStorage.getItem('user');
    if(userdata){
      return JSON.parse(userdata).isAdmin;
    }
    return false;
  }
  get username(){
    let userdata=localStorage.getItem('user');
    if(userdata){
      return JSON.parse(userdata).name;
    }
    return null;
  }
  get email(){
    let userdata=localStorage.getItem('user');
    if(userdata){
      return JSON.parse(userdata).email;
    }
    return null;
  }
  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

}
