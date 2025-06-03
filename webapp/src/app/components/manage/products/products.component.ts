import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../types/category';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [MatButtonModule,MatFormFieldModule, MatInputModule, MatTableModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private productservice:ProductService,private router:Router){}

  ELEMENT_DATA: any = [];
  // name:String,
  //   shortDescription:String,
  //   Description:String,
  //   Price:Number,
  //   discount:Number,
  //   Images:Array(String),
  //   CategoryId:{
  //       type:mongoose.Schema.Types.ObjectId,
  //       ref:"Category",
  //   }
  displayedColumns: string[] = ['_id', 'name', 'shortDescription','Price','discount','action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ngOnInit(): void {
  this.fetchproduct()
}
  fetchproduct(){
    this.productservice.get_product().subscribe((r:any)=>{
      this.dataSource = new MatTableDataSource(r);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  delete(id:any){
    this.productservice.delete_product(id).subscribe((r)=>{
      alert("deleted")
      this.fetchproduct()
    })
  }
}
