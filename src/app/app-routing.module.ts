import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {MyCardComponent} from './my-card/my-card.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {MainContentComponent} from './main-content/main-content.component';
import {PartnersComponent} from './partners/partners.component';
import {MagazinyComponent} from './magaziny/magaziny.component';
import {RozygrywComponent} from './rozygryw/rozygryw.component';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainContentComponent },
  { path: 'basket', component: MyCardComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'product', component: ProductCardComponent},
  { path: 'basket', component: MyCardComponent},
  { path: 'partners', component: PartnersComponent},
  { path: 'shopList', component: MagazinyComponent},
  { path: 'lotery', component: RozygrywComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
