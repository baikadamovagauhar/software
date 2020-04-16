import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {MyCardComponent} from "./my-card/my-card.component";


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'basket', component: MyCardComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
