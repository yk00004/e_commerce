import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-categories',
  imports: [MatButtonModule,MatFormFieldModule, MatInputModule, MatTableModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  constructor(private categoriesservice:CategoryService,private router:Router){}

  ELEMENT_DATA: any = [];
  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category[]>(this.ELEMENT_DATA);

  ngOnInit(): void {
  this.fetchcategories()
}
  fetchcategories(){
    this.categoriesservice.getcategories().subscribe((r:any)=>{
      this.dataSource = new MatTableDataSource(r);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  delete(id:any){
    this.categoriesservice.deletecategory(id).subscribe((r)=>{
      alert("deleted")
      this.fetchcategories()
    })
  }
}
