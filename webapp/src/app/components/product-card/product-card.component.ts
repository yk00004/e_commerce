import { CartService } from './../../services/cart.service';
import { WishlistService } from './../../services/wishlist.service';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../types/product';
import { CustomerService } from './../../services/customer.service';
import { Component, Input, input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, MatCardModule, MatButtonModule, NgIf, MatIcon],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() item: any;
  cartAdded = false;
  wishlistAdded = false;
  constructor(
    private Wishlistservice: WishlistService,
    private Cartservice:CartService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {}

  roundPrice(price: number, discount?: number): number {
    if (discount) {
      return Math.round(price - (price * discount) / 100);
    }
    return Math.round(price);
  }

  addtowishlist(item: any) {
    if (!this.isinwishlist(item)) {
      this.Wishlistservice.add_product_wishlist(item._id).subscribe((e) => {
        this.Wishlistservice.init();
      });
    } else {
      this.Wishlistservice.delete_product_wishlist(item._id).subscribe((e) => {
        this.Wishlistservice.init();
      });
    }
  }

  isinwishlist(product: Product): boolean {
    if (
      !this.Wishlistservice.wishproduct ||
      this.Wishlistservice.wishproduct.length === 0
    ) {
      return false;
    }
    const result = this.Wishlistservice.wishproduct.some((x: any) => {
      const match = String(x.productId._id) === String(product._id);
      return match;
    });
    return result;
  }
  addtocart(item: any) {
    if (!this.isincart(item)) {
      console.log(item);
      this.Cartservice.add_product_cart(item._id,1).subscribe((e) => {
        this.Cartservice.init();
      });
    } else {
      this.Cartservice.delete_product_cart(item._id).subscribe((e) => {
        this.Cartservice.init();
      });
    }
  }

  isincart(product:Product){
     if (
      !this.Cartservice.cartproduct ||
      this.Cartservice.cartproduct.length === 0
    ) {
      return false;
    }
    const result=this.Cartservice.cartproduct.some((x:any)=>{
      const match=String(x.productId._id)===String(product._id);
      return match;
    })
    return result;
  }
}
