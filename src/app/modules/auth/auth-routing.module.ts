import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { CartCheckoutComponent } from 'src/app/modules/auth/users/cart-checkout/cart-checkout.component';
import { CartDetailsComponent } from 'src/app/modules/auth/users/cart-details/cart-details.component';
import { CartSubscriptionComponent } from 'src/app/modules/auth/users/cart-subscription/cart-subscription.component';
import { UserProfileComponent } from 'src/app/modules/auth/users/user-profile/user-profile.component';
import { ProfileEditComponent } from 'src/app/modules/auth/users/profile-edit/profile-edit.component';
import { UserTestComponent } from 'src/app/modules/auth/users/user-test/user-test.component';
import { UserCartComponent } from 'src/app/modules/auth/users/usercart/usercart.component';
import { UsersComponent } from 'src/app/modules/auth/users/users.component';
import { UserViewComponent } from 'src/app/modules/auth/users/user-view/user-view.component';
import { UserEditComponent } from 'src/app/modules/auth/users/user-edit/user-edit.component';
import { AdminPrimelistComponent } from 'src/app/modules/auth/area/admin-primelist/admin-primelist.component';
import { AdminFranchiselistComponent } from 'src/app/modules/auth/area/admin-franchiselist/admin-franchiselist.component';
import { ManagerListComponent } from 'src/app/modules/auth/area/manager-list/manager-list.component';
import { ManagerEditComponent } from 'src/app/modules/auth/area/manager-edit/manager-edit.component';
import { ManagerUserComponent } from 'src/app/modules/auth/area/manager-user/manager-user.component';
import { ManagerPrimelistComponent } from 'src/app/modules/auth/area/manager-primelist/manager-primelist.component';
import { ManagerFranchiselistComponent } from 'src/app/modules/auth/area/manager-franchiselist/manager-franchiselist.component';
import { FranchiseInfoComponent } from 'src/app/modules/auth/area/franchise-info/franchise-info.component';
import { AuthGuard } from 'src/app/modules/auth/resources/auth.guard';
import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/auth/resources/manager.guard';
import { FranchiseGuard } from 'src/app/modules/auth/resources/franchise.guard';

const routes: Routes = [
  //*********** User area ***/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  {
    path: 'user-test/:id',
    canActivate: [AuthGuard],
    component: UserTestComponent,
  },
  //*********** Admin area ***/
  { path: 'user-list', canActivate: [AdminGuard], component: UsersComponent },
  {
    path: 'admin-primelist',
    canActivate: [AdminGuard],
    component: AdminPrimelistComponent,
  },
  {
    path: 'admin-franchiselist',
    canActivate: [AdminGuard],
    component: AdminFranchiselistComponent,
  },
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
  //*********** Manager area ***/
  {
    path: 'manager/user-list',
    canActivate: [ManagerGuard],
    component: ManagerListComponent,
  },
  {
    path: 'manager-primelist',
    canActivate: [ManagerGuard],
    component: ManagerPrimelistComponent,
  },
  {
    path: 'manager-franchiselist',
    canActivate: [ManagerGuard],
    component: ManagerFranchiselistComponent,
  },
  {
    path: 'manager/user/:id',
    canActivate: [ManagerGuard],
    component: ManagerUserComponent,
  },
  {
    path: 'manager/useredit/:id',
    canActivate: [ManagerGuard],
    component: ManagerEditComponent,
  },
  //*********** Franchise area ***/
  {
    path: 'franchise/info',
    canActivate: [FranchiseGuard],
    component: FranchiseInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
