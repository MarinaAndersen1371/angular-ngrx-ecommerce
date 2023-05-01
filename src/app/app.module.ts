import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-alerts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CoreComponent } from 'src/app/core/core.component';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { OrdersModule } from 'src/app/modules/orders/orders.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopBarComponent } from 'src/app/shared/top-bar/top-bar.component';
import { environment } from 'src/environments/environment';
import { reducers } from 'src/app/store';
import { CustomerSupportEffects } from 'src/app/pages/customer-support/state/customer-support.effects';
import { SpinnerEffects } from 'src/app/store/spinner.effects';
import { AlertEffects } from 'src/app/store/alert.effects';
import { RouteEffects } from 'src/app/store/route.effects';
import { AppEffects } from 'src/app/store/app.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyMailsComponent } from './modules/mails/my-mails/my-mails.component';
import { MailComponent } from './modules/mails/mail/mail.component';

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean;
  }
}

@NgModule({
  declarations: [AppComponent, CoreComponent, HeaderComponent, TopBarComponent, MyMailsComponent, MailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
    OrdersModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule,
    AuthModule,
    FormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' }),
    BsDropdownModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      CustomerSupportEffects,
      SpinnerEffects,
      AlertEffects,
      RouteEffects,
      AppEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
