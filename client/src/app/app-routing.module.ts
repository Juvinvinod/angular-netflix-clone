import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './userlisting/create/create.component';
import { roleGuard } from './guard/role.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[authGuard]},
  {path:'admin',component:UserlistingComponent,canActivate:[roleGuard,authGuard]},
  {path:'admin/edit/:id',component:CreateComponent,canActivate:[roleGuard,authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
