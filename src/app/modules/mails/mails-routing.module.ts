import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/auth/resources/auth.guard';
import { MailComponent } from 'src/app/modules/mails/mail/mail.component';
import { MyMailsComponent } from 'src/app/modules/mails/my-mails/my-mails.component';
import { SentMailComponent } from 'src/app/modules/mails/sent-mail/sent-mail.component';
import { SentMailsComponent } from 'src/app/modules/mails/sent-mails/sent-mails.component';

const routes: Routes = [
  { path: 'my-mails', canActivate: [AuthGuard], component: MyMailsComponent },
  {
    path: 'mail/:id',
    canActivate: [AuthGuard],
    component: MailComponent,
  },
  {
    path: 'sent-mails',
    canActivate: [AuthGuard],
    component: SentMailsComponent,
  },
  {
    path: 'sent-mail',
    canActivate: [AuthGuard],
    component: SentMailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailsRoutingModule {}
