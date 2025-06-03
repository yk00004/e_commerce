import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductsFormComponent } from './components/manage/products-form/products-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard, authGuard } from './auth.guard';
import { AdminDeshbordComponent } from './components/manage/admin-deshbord/admin-deshbord.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/manage/orders/orders.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate:[authGuard]
  },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin",
    component:AdminDeshbordComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/categories/add',
    component: CategoryFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/categories/:id',
    component: CategoryFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/brands',
    component: BrandsComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/brands/add',
    component: BrandFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/brands/:id',
    component: BrandFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/products/add',
    component: ProductsFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/products/:id',
    component: ProductsFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    // canActivate:[adminGuard]
  },
  {
    path: 'product',
    component: ProductListComponent,
    canActivate:[authGuard]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate:[authGuard]
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate:[authGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate:[authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate:[authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },

];
