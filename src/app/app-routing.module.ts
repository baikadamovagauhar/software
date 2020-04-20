import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {MyCardComponent} from './my-card/my-card.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-card/product-card.component';


const routes: Routes = [
  { path: 'main', component: AppComponent },
  { path: 'basket', component: MyCardComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'product', component: ProductCardComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
