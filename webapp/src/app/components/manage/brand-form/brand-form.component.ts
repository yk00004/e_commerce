
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  constructor(private brandservice:BrandService,private router:Router,private route:ActivatedRoute){}
  name!:string;
  isedit=false;
  id!:string;
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.isedit=true;
      this.brandservice.get_brand_byid(this.id).subscribe((r:any)=>{
        this.name=r.name;
      })
    }
  }
  add(){
    this.brandservice.add_brand(this.name).subscribe((r)=>{
      alert("category added")
      this.name=""
      this.router.navigateByUrl("/admin/brands")
    });
  }
  update(){
    this.brandservice.update_brand_byid(this.id,this.name).subscribe((r)=>{
      alert("updated")
      this.router.navigateByUrl("/admin/brands")
    })
  }
}
