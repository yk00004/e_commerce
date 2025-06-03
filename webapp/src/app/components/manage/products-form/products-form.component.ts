import { CategoryService } from './../../../services/category.service';
import { BrandService } from './../../../services/brand.service';
import { Brand } from './../../../types/brand';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import {MatSelectModule} from '@angular/material/select';
import { Category } from '../../../types/category';
import { Product } from '../../../types/product';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-products-form',
  imports: [MatCheckboxModule,ReactiveFormsModule,MatSelectModule,FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent {
  isedit = false;
  id!: string;
  productform!: FormGroup;
  brands:Brand[]=[];
  categories:Category[]=[];

  constructor(
    private fb:FormBuilder,
    private productservice: ProductService,
    private brandservice:BrandService,
    private categoryservice:CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.productform=this.fb.group({
      name: [null,[Validators.required,Validators.minLength(5)]],
      shortDescription: [null,[Validators.required,Validators.maxLength(30)]],
      Description:[null,[Validators.required]],
      Price: [null,[Validators.required]],
      discount: [],
      Images: this.fb.array([]),
      CategoryId: [null,[Validators.required]],
      brandId: [null,[Validators.required]],
      facheredproduct:[false],
      isnewproduct:[false],
    })

    this.categoryservice.getcategories().subscribe((r)=>{
      this.categories=r;
    })
    this.brandservice.get_brand().subscribe((r)=>{
      this.brands=r;
    })

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isedit = true;
      this.productservice.get_product_byid(this.id).subscribe((r: any) => {
        for (let index = 0; index < r.Images.length; index++) {
          this.addimage()
        }
        this.productform.patchValue(r);
        // this.productform.markAllAsTouched();
        // this.productform.updateValueAndValidity();
      });
    }else{
    this.addimage()
    }
  };
  addimage(){
    this.Images.push(this.fb.control(null));
  };
  removeimage(){
    this.Images.removeAt(this.Images.controls.length-1);
  };
  get Images(){
    return this.productform.get('Images') as FormArray
  };
  add() {
    console.log(this.productform.value);

    this.productservice.add_product(this.productform.value).subscribe((r) => {
      alert('category added');
      this.router.navigateByUrl('/admin/products');
    });
  }
  update() {
    this.productservice
      .update_product_byid(this.id, this.productform.value)
      .subscribe((r) => {
        alert('updated');
        this.router.navigateByUrl('/admin/products');
      });
  }
}
