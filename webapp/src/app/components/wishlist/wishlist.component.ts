import { MatCard } from '@angular/material/card';
import { Product } from '../../types/product';
import { WishlistService } from './../../services/wishlist.service';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent,NgFor,NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  whishlist?:any;
  constructor(private Wishlistservice:WishlistService){}
  ngOnInit(): void {
    this.Wishlistservice.get_wishlist_product().subscribe((e:any)=>{
      this.whishlist=e
      console.log(this.whishlist[0].productId);

    })
  }
   addtowishlist(item:any){
    console.log(this.isinwishlist(item));

    if(!this.isinwishlist(item)){
      this.Wishlistservice.add_product_wishlist(item._id).subscribe((e)=>{
        this.Wishlistservice.init();
      })
    }else{
      this.Wishlistservice.delete_product_wishlist(item._id).subscribe((e)=>{
        this.Wishlistservice.init();
      })
    }
  }
  isinwishlist(product: Product): boolean {
  if (!this.Wishlistservice.wishproduct || this.Wishlistservice.wishproduct.length === 0) {
    return false;
  }
  const result = this.Wishlistservice.wishproduct.some((x: any) => {
    const match = String(x.productId._id) === String(product._id);
    return match;
  });
  return result;
}

}
