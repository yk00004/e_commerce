import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private Router:Router,private fb: FormBuilder,private authservice:AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
}
onSubmit() {
  if (this.registerForm.valid) {
    const a=this.authservice.register(this.registerForm.value.name,this.registerForm.value.email,this.registerForm.value.password).subscribe((r)=>{
      console.log(r);

    });

    this.Router.navigateByUrl("/login")
    alert("resigterd")
  }
}
}
