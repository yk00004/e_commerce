import { WishlistService } from './../../services/wishlist.service';
import { BrandService } from './../../services/brand.service';
import { CategoryService } from './../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CustomerService } from './../../services/customer.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule, MatSelectModule,FormsModule, RouterLink,NgFor,NgIf,MatSidenavModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  categories: any[] = []; // Load from API or static
  brands: any[] = []; // Load from API or static

  categoryId: string = '';
  search: string = '';
  brandId: string = '';
  sort: 'price_asc' | 'price_desc' = 'price_desc';

  constructor(
    private customerService: CustomerService,
    private CategoryService: CategoryService,
    private Wishlistservice:WishlistService,
    private BrandService: BrandService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadCategories();
      this.loadBrands();
    }, 500);

    this.route.queryParamMap.subscribe((params) => {
      this.categoryId = params.get('categoryId') || '';
      this.search = params.get('search') || '';
      this.brandId = params.get('brandId') || '';
      this.sort =
        (params.get('sort') as 'price_asc' | 'price_desc') || 'price_desc';

      this.getproduct();
    });
     this.Wishlistservice.init();
  }
  loadCategories() {
    this.CategoryService.getcategories().subscribe((e) => {
      this.categories = e;
    });
  }

  loadBrands() {
    this.BrandService.get_brand().subscribe((e) => {
      this.brands = e;
    });
  }
  applyFilters() {
    this.router.navigateByUrl(
      `/product?categoryId=${this.categoryId}&search=${this.search}&brandId=${this.brandId}&sort=${this.sort}`
    );
  }

  getproduct() {
    this.customerService
      .get_searched(this.search, this.categoryId, this.brandId, this.sort)
      .subscribe((products) => {
        this.products = products;
      });
  }
  roundPrice(price: number, discount?: number): number {
  if (discount) {
    return Math.round(price - (price * discount) / 100);
  }
  return Math.round(price);
}
}
