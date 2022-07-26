import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthRoutingModule } from 'src/app/modules/auth/auth-routing.module';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { UsersComponent } from 'src/app/modules/auth/users/users.component';
import { AuthLinksComponent } from 'src/app/modules/auth/auth-links/auth-links.component';
import * as fromAuth from 'src/app/modules/auth/state/auth.reducer';
import { AuthEffects } from 'src/app/modules/auth/state/auth.effects';
import { UserEffects } from 'src/app/modules/auth/state/user.effects';
import { UserCartComponent } from 'src/app/modules/auth/users/usercart/usercart.component';
import { CartDetailsComponent } from 'src/app/modules/auth/users/cart-details/cart-details.component';
import { CartCheckoutComponent } from 'src/app/modules/auth/users/cart-checkout/cart-checkout.component';
import { UserViewComponent } from 'src/app/modules/auth/users/user-view/user-view.component';
import { UserEditComponent } from 'src/app/modules/auth/users/user-edit/user-edit.component';
import { UserProfileComponent } from 'src/app/modules/auth/users/user-profile/user-profile.component';
import { ProfileEditComponent } from 'src/app/modules/auth/users/profile-edit/profile-edit.component';
import { CartSubscriptionComponent } from 'src/app/modules/auth/users/cart-subscription/cart-subscription.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthLinksComponent,
    UsersComponent,
    UserCartComponent,
    CartDetailsComponent,
    CartCheckoutComponent,
    UserViewComponent,
    UserEditComponent,
    UserProfileComponent,
    ProfileEditComponent,
    CartSubscriptionComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects, UserEffects]),
  ],
  exports: [AuthLinksComponent],
})
export class AuthModule {}
