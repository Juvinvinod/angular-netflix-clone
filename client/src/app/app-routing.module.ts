import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserlistingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
