import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { InfoEnglishComponent } from 'src/app/pages/info/info-english/info-english.component';
import { InfoGermanComponent } from 'src/app/pages/info/info-german/info-german.component';
import { InfoSpanishComponent } from 'src/app/pages/info/info-spanish/info-spanish.component';
import { InfoRussianComponent } from 'src/app/pages/info/info-russian/info-russian.component';
import { CustomerSupportComponent } from 'src/app/pages/customer-support/customer-support.component';
import { TicketsComponent } from 'src/app/pages/customer-support/tickets.component';
import { TicketComponent } from 'src/app/pages/customer-support/ticket/ticket.component';
import { ManagerTicketsComponent } from 'src/app/pages/customer-support/manager-tickets/manager-tickets.component';
import { ManagerTicketComponent } from 'src/app/pages/customer-support/manager-ticket/manager-ticket.component';
import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/auth/resources/manager.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'info-english', component: InfoEnglishComponent },
  { path: 'info-german', component: InfoGermanComponent },
  { path: 'info-spanish', component: InfoSpanishComponent },
  { path: 'info-russian', component: InfoRussianComponent },
  { path: 'support', component: CustomerSupportComponent },
  {
    path: 'ticket-list',
    canActivate: [AdminGuard],
    component: TicketsComponent,
  },
  {
    path: 'manager/ticket-list',
    canActivate: [ManagerGuard],
    component: ManagerTicketsComponent,
  },
  {
    path: 'ticket/:id',
    canActivate: [AdminGuard],
    component: TicketComponent,
  },
  {
    path: 'manager/ticket/:id',
    canActivate: [ManagerGuard],
    component: ManagerTicketComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
