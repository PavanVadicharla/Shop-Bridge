
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/routegaurd-service';
import { UpdateItemComponent } from './update-item/update-item.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-item',
    component: AddItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-item',
    component: UpdateItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
    data: { animation: 'login', browserTabTitleKey: 'Login'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
