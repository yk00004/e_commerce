import { CustomerService } from './../../services/customer.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    RouterLink,
    MatFormField,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatIconButton,
    NgFor,NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  categorylist: any = [];
  searchvalyu?: string ;

  constructor(
    private router: Router,
    private Customerservice: CustomerService,
    public Authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.Customerservice.get_categories().subscribe((r) => {
      this.categorylist = r;
    });
  }
  onsearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl('/product?search=' + e.target.value);
    }
  }
  searchcategory(id: String) {
    this.searchvalyu = '';
    this.router.navigateByUrl('/product?categoryId=' + id);
  }

  logout() {
    this.Authservice.logout();
    this.router.navigateByUrl('/login');
  }
}
