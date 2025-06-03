
import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types/brand';

@Component({
  selector: 'app-brands',
  imports: [MatButtonModule,MatFormFieldModule, MatInputModule, MatTableModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  constructor(private brandservice:BrandService,private router:Router){}

  ELEMENT_DATA: any = [];
  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource = new MatTableDataSource<Brand[]>(this.ELEMENT_DATA);

  ngOnInit(): void {
  this.fetchcategories()
}
  fetchcategories(){
    this.brandservice.get_brand().subscribe((r:any)=>{
      this.dataSource = new MatTableDataSource(r);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  delete(id:any){
    this.brandservice.delete_brand(id).subscribe((r)=>{
      alert("deleted")
      this.fetchcategories()
    })
  }
}
