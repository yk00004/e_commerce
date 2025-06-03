import { routes } from './../../app.routes';
import { CartService } from './../../services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-cart',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgFor,
    NgIf,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartitems?: any;
  addressform!: FormGroup;

  constructor(private orderservice:OrderService,private router: Router, public Cartservice: CartService,private fb:FormBuilder) {

  }
  ngOnInit(): void {
    this.addressform=this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    })
    this.Cartservice.init();
    this.Cartservice.get_cart_product().subscribe((e) => {
      this.cartitems = e;
      console.log(this.cartitems);
    });
  }

  updateQuantity(item: any) {
    if (item.quantity < 1) item.quantity = 1;
  }
  roundPrice(price: number, discount?: number): number {
    if (discount) {
      return Math.round(price - (price * discount) / 100);
    }
    return Math.round(price);
  }
  incresquntity(item:any){
    item.quantity += 1;
    this.Cartservice.update_product_cart(item.productId._id,item.quantity).subscribe((e)=>{
       this.Cartservice.get_cart_product().subscribe((updated) => {
      this.cartitems = updated;
    });
    })
  }
  getTotal(): number {
  return this.cartitems?.reduce((sum: number, item: any) => {
    const price = this.roundPrice(item.productId.Price, item.productId.discount);
    return sum + (price * item.quantity);
  }, 0) || 0;
}

  decquntity(item:any){
    if (item.quantity > 1) {
    item.quantity -= 1;
    this.Cartservice.update_product_cart(item.productId._id, item.quantity).subscribe((e) => {
       this.Cartservice.get_cart_product().subscribe((updated) => {
      this.cartitems = updated;
    });
    });
  }
  }

  removeItem(item: any) {
    this.Cartservice.delete_product_cart(item._id).subscribe((e) => {
      this.Cartservice.get_cart_product().subscribe((updated) => {
      this.cartitems = updated;
    });
    });
  }
  orderstep:number=0;
  paymentMethod: string = '';
  getaddresspage_0(){
    this.orderstep=1;
  }
  onSubmit() {
    if (this.addressform.valid) {
      this.orderstep=2
      console.log('Address:', this.addressform.value);
      // Navigate to payment or store data as needed
    } else {
      this.addressform.markAllAsTouched();
    }
  }
  onSelect(mode:string){
    let order={
      item:this.cartitems,
      paymentmode:mode,
      address:this.addressform.value,
      date:new Date(),
      totalamount:this.getTotal()
    }
    console.log(order);
    this.orderservice.add_order(order).subscribe((e)=>{
      this.router.navigateByUrl("/order")
    })
  }

}
