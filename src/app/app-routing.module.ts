import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginViewComponent} from './Views/login-view/login-view.component';
import {AdminViewComponent} from './Views/admin-view/admin-view.component';
import {UserViewComponent} from './Views/user-view/user-view.component';
import {AdminGuard} from './Guards/Admin/admin.guard';
import {UserGuard} from './Guards/User/user.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user',
    component: UserViewComponent,
    canActivate: [UserGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
