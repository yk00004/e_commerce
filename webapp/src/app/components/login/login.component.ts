import { routes } from './../../app.routes';
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
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  registerForm: FormGroup;

  constructor(private router:Router,private fb: FormBuilder,private authservice:AuthService) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

}
onSubmit() {
  if (this.registerForm.valid) {
    const a=this.authservice.login(this.registerForm.value.email,this.registerForm.value.password).subscribe((r:any)=>{
        console.log(r);
      localStorage.setItem("token",r.token)
      localStorage.setItem("user",JSON.stringify(r.user))
      // this.router.navigateByUrl('/')
      this.router.navigate(['/']);
    });

    alert("resigterd")

  }
}
}
