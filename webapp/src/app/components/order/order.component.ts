import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orderlist:any;
   constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.get_order().subscribe((e)=>{
      this.orderlist=e
      console.log(this.orderlist);

    });
  }
}
