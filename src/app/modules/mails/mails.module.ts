import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MailsRoutingModule } from 'src/app/modules/mails/mails-routing.module';
import * as fromMails from 'src/app/modules/mails/state/mail.reducers';
import { MailEffects } from 'src/app/modules/mails/state/mail.effects';
import { SentMailsComponent } from './sent-mails/sent-mails.component';
import { SentMailComponent } from './sent-mail/sent-mail.component';

@NgModule({
  declarations: [
    SentMailsComponent,
    SentMailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    MailsRoutingModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule,
    StoreModule.forFeature(fromMails.mailsFeatureKey, fromMails.reducer),
    EffectsModule.forFeature([MailEffects]),
  ],
})
export class MailsModule {}
