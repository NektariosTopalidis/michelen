import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateProductsComponent } from './components/dashboard/update-products/update-products.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate:[AuthGuard],
  },
  {
    path : 'dashboard',
    canActivate:[AdminAuthGuard],
    component:DashboardComponent,
    children:[

          {
            path:'update-products',
            component:UpdateProductsComponent
          }


    ]
  },
  {
    path:'cart',
    canActivate:[AuthGuard],
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
