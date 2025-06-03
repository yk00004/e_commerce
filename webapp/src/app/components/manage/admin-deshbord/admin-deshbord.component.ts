import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-deshbord',
  imports: [MatButtonModule,RouterLink],
  templateUrl: './admin-deshbord.component.html',
  styleUrl: './admin-deshbord.component.scss'
})
export class AdminDeshbordComponent {

}
