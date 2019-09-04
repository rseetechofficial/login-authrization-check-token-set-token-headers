import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
const routes: Routes = [
  {path : "",component : LoginComponent },
  {path : 'home',component : HomeComponent,
  children : [
{path : 'products',component : ProductsComponent},
{path : 'categories',component : CategoriesComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
