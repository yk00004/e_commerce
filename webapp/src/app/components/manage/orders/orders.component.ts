import { AdminService } from './../../../services/admin.service';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [

    MatFormFieldModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,NgFor,
    CommonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: any;
  displayedColumns: string[] = [

    'orderId',
    'user',
    'date',
    'items',
    'totalamount',
    'paymentmode',
    'status',
    'actions',
  ];
  constructor(private Adminservice: AdminService) {}
  ngOnInit(): void {

    this.Adminservice.get_all_order().subscribe((e:any) => {

      this.orders = e;
      console.log(this.orders);

    });
  }
  updateStatus(orderId: string, newStatus: string) {
    this.Adminservice.change_order_status(orderId, newStatus).subscribe((e) => {
      this.Adminservice.get_all_order().subscribe((e) => {
        this.orders = e;
      });
    });
  }

  deleteOrder(orderId: string) {
    this.Adminservice.delete_order(orderId).subscribe((e) => {
      this.Adminservice.get_all_order().subscribe((e) => {
        this.orders = e;
      });
    });
  }
}
