import { Routes } from '@angular/router';
import { loginGuard } from './root/utils/guards/login.guard';
import { LoginComponent } from './root/components/login/login-component/login-component';
import { HomeComponent } from './root/components/home-component/home-component';
import { authGuard } from './root/utils/guards/auth.guard';
import { AddUserComponent } from './root/components/for-admin/add-user-component/add-user-component';
import { ChangePasswordComponent } from './root/components/header-component/change-password-component/change-password-component';

export const routes: Routes = [
    {path : 'login', component : LoginComponent, canActivate : [loginGuard]},
    {path : "home", component : HomeComponent, canActivate : [authGuard]},
    {path : '', redirectTo : 'home', pathMatch : 'full'},
    {path : "add-user", component : AddUserComponent, canActivate : [authGuard]},
    {path : "change-password", component : ChangePasswordComponent, canActivate : [authGuard]},
];
