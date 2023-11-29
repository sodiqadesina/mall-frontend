import { NgModule } from '@angular/core';
import {AdminAuthGuard} from '../auth/auth.guard'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren : ()=> import("./main/main.module").then(m=> m.MainModule), canActivate: [AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
