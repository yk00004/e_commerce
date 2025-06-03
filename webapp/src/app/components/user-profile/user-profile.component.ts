import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor(public Authservice:AuthService,private router:Router){}
  logout(){
    this.Authservice.logout()
    this.router.navigateByUrl('/login')
  }
}
