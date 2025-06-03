import { CartService } from './../../services/cart.service';
import { WishlistService } from './../../services/wishlist.service';
import { Category } from './../../types/category';
import { CategoryService } from './../../services/category.service';
import { BrandService } from './../../services/brand.service';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { CustomerService } from './../../services/customer.service';
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  imports: [NgFor,NgIf,ProductCardComponent,MatIcon,MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product:any;

  similarproduct:any;
  categoryname:String="";
  brandname:string="";
  selectedImage: string = '';

  constructor(private Wishlistservice:WishlistService,private Cartservice:CartService,private BrandService:BrandService,private CategoryService:CategoryService,private ProductService:ProductService,private Router:ActivatedRoute,private CustomerService:CustomerService){}
  ngOnInit(): void {
    this.Router.params.subscribe((e:any)=>{
        this.getdata(e.id)
    })
     this.Wishlistservice.init();
     this.Cartservice.init();


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
  getdata(id:any){
    this.ProductService.get_product_byid(id).subscribe((e)=>{
      this.product=e;
      this.selectedImage = this.product.Images?.[0];
      this.CustomerService.get_searched('',this.product.CategoryId,'','price_desc').subscribe((e)=>{
        this.similarproduct=e;
      })

      this.CategoryService.getcategorybyid(this.product.CategoryId).subscribe((e)=>{
        this.categoryname=e.name
      })
      this.BrandService.get_brand_byid(this.product.brandId).subscribe((e)=>{
        this.brandname=e.name
      })
    })
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
  roundPrice(price: number, discount?: number): number {
  if (discount) {
    return Math.round(price - (price * discount) / 100);
  }
  return Math.round(price);
}
}
