import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCountriesFlagsModule } from 'angular-countries-flags';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CustomerSupportComponent } from 'src/app/pages/customer-support/customer-support.component';
import * as fromCustomerSupport from 'src/app/pages/customer-support/state/customer-support.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerSupportEffects } from 'src/app/pages/customer-support/state/customer-support.effects';
import { TicketsComponent } from 'src/app/pages/customer-support/tickets.component';
import { TicketEffects } from 'src/app/pages/customer-support/state/ticket.effects';
import { TicketComponent } from 'src/app/pages/customer-support/ticket/ticket.component';
import { ManagerTicketsComponent } from 'src/app/pages/customer-support/manager-tickets/manager-tickets.component';
import { ManagerTicketComponent } from 'src/app/pages/customer-support/manager-ticket/manager-ticket.component';
import { InfoEnglishComponent } from 'src/app/pages/info/info-english/info-english.component';
import { InfoGermanComponent } from 'src/app/pages/info/info-german/info-german.component';
import { InfoSpanishComponent } from 'src/app/pages/info/info-spanish/info-spanish.component';
import { InfoRussianComponent } from 'src/app/pages/info/info-russian/info-russian.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    CustomerSupportComponent,
    TicketsComponent,
    TicketComponent,
    ManagerTicketsComponent,
    ManagerTicketComponent,
    InfoEnglishComponent,
    InfoGermanComponent,
    InfoSpanishComponent,
    InfoRussianComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    AngularCountriesFlagsModule,
    PagesRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(
      fromCustomerSupport.customerSupportFeatureKey,
      fromCustomerSupport.reducer
    ),
    EffectsModule.forFeature([CustomerSupportEffects, TicketEffects]),
  ],
})
export class PagesModule {}
