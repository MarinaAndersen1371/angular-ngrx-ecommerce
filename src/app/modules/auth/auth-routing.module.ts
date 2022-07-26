import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { UsersComponent } from 'src/app/modules/auth/users/users.component';
import { CartCheckoutComponent } from 'src/app/modules/auth/users/cart-checkout/cart-checkout.component';
import { CartDetailsComponent } from 'src/app/modules/auth/users/cart-details/cart-details.component';
import { CartSubscriptionComponent } from 'src/app/modules/auth/users/cart-subscription/cart-subscription.component';
import { UserCartComponent } from 'src/app/modules/auth/users/usercart/usercart.component';
import { UserViewComponent } from 'src/app/modules/auth/users/user-view/user-view.component';
import { UserEditComponent } from 'src/app/modules/auth/users/user-edit/user-edit.component';
import { UserProfileComponent } from 'src/app/modules/auth/users/user-profile/user-profile.component';
import { ProfileEditComponent } from 'src/app/modules/auth/users/profile-edit/profile-edit.component';
import { AuthGuard } from 'src/app/modules/auth/resources/auth.guard';
import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userlist', canActivate: [AdminGuard], component: UsersComponent },
  {
    path: 'userview/:id',
    canActivate: [AdminGuard],
    component: UserViewComponent,
  },
  {
    path: 'useredit/:id',
    canActivate: [AdminGuard],
    component: UserEditComponent,
  },
  {
    path: 'usercart/:id',
    canActivate: [AuthGuard],
    component: UserCartComponent,
  },
  {
    path: 'cartdetails/:id',
    canActivate: [AuthGuard],
    component: CartDetailsComponent,
  },
  {
    path: 'cartsubscription/:id',
    canActivate: [AuthGuard],
    component: CartSubscriptionComponent,
  },
  {
    path: 'cartcheckout/:id',
    canActivate: [AuthGuard],
    component: CartCheckoutComponent,
  },
  {
    path: 'userprofile/:id',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  {
    path: 'editprofile/:id',
    canActivate: [AuthGuard],
    component: ProfileEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
