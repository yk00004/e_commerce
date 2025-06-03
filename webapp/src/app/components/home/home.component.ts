import { CartService } from './../../services/cart.service';
import { WishlistService } from './../../services/wishlist.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { CustomerService } from './../../services/customer.service';
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [

    CarouselModule,
    MatCardModule,
    MatButtonModule,
    ProductCardComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  isnewproduts: Product[] = [];
  fetreproducts: Product[] = [];
  carouserimage:Product[]=[];
  constructor(private customerservice: CustomerService,private Wishlistservice:WishlistService,private Cartservice:CartService) {}

  ngOnInit(): void {
    this.customerservice.get_fetureproduct().subscribe((r) => {
      this.fetreproducts = r;
      this.carouserimage.push(...r)
    });
    this.customerservice.get_isnewproduct().subscribe((r) => {
      this.isnewproduts = r;
      this.carouserimage.push(...r)
    });
    this.Wishlistservice.init();
    this.Cartservice.init();
  }
  customOptions: OwlOptions = {
  loop: true,
  margin: 8,
  autoplay: true,
  autoplayTimeout: 3000,
  dots: true,
  navSpeed: 500,
  navText: ['', ''],
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    940: { items: 3 }
  },
  nav: true
  };
}
