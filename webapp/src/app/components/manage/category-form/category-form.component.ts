import { NgIf } from '@angular/common';
import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  constructor(private categoryservice:CategoryService,private router:Router,private route:ActivatedRoute){}
  name!:string;
  isedit=false;
  id!:string;
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.isedit=true;
      this.categoryservice.getcategorybyid(this.id).subscribe((r:any)=>{
        this.name=r.name;
      })
    }
  }
  add(){
    this.categoryservice.addcategory(this.name).subscribe((r)=>{
      alert("category added")
      this.name=""
      this.router.navigateByUrl("/admin/categories")
    });
  }
  update(){
    this.categoryservice.updatecategorybyid(this.id,this.name).subscribe((r)=>{
      alert("updated")
      this.router.navigateByUrl("/admin/categories")
    })
  }
}
