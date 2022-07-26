import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { CustomerSupportComponent } from 'src/app/pages/customer-support/customer-support.component';
import { TicketsComponent } from 'src/app/pages/customer-support/tickets.component';
import { TicketComponent } from 'src/app/pages/customer-support/ticket/ticket.component';
import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'support', component: CustomerSupportComponent },
  {
    path: 'ticketlist',
    canActivate: [AdminGuard],
    component: TicketsComponent,
  },
  {
    path: 'ticket/:id',
    canActivate: [AdminGuard],
    component: TicketComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
