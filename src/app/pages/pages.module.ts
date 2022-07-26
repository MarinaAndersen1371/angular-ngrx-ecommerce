import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import * as fromCustomerSupport from 'src/app/pages/customer-support/state/customer-support.reducer';
import { SharedModule } from '../shared/shared.module';
import { CustomerSupportEffects } from 'src/app/pages/customer-support/state/customer-support.effects';
import { TicketsComponent } from './customer-support/tickets.component';
import { TicketEffects } from 'src/app/pages/customer-support/state/ticket.effects';
import { TicketComponent } from './customer-support/ticket/ticket.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    CustomerSupportComponent,
    TicketsComponent,
    TicketComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(
      fromCustomerSupport.customerSupportFeatureKey,
      fromCustomerSupport.reducers
    ),
    EffectsModule.forFeature([CustomerSupportEffects, TicketEffects]),
  ],
})
export class PagesModule {}
