import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MailService } from 'src/app/modules/mails/resources/mail.service';
import * as MailActions from 'src/app/modules/mails/state/mail.actions';

@Injectable()
export class MailEffects {
  loadMails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MailActions.loadMails),
      mergeMap(() =>
        this.mailService.getMails().pipe(
          map((mails) => MailActions.loadMailsSuccess({ mails })),
          catchError((error) => of(MailActions.loadMailsFailure({ error })))
        )
      )
    );
  });

  loadMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.loadMail),
      mergeMap((action) =>
        this.mailService.getMail(action._id).pipe(
          map((mail) => MailActions.loadMailSuccess({ mail })),
          catchError((error) =>
            of(MailActions.loadMailFailure({ error: error }))
          )
        )
      )
    )
  );

  statusMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.statusMail),
      mergeMap((action) =>
        this.mailService.statusMail(action.mailId).pipe(
          map((mail) => MailActions.statusMailSuccess({ mail })),
          catchError((error) => of(MailActions.statusMailFailure({ error })))
        )
      )
    )
  );

  openMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.openMail),
      mergeMap((action) =>
        this.mailService.openMail(action.mailId).pipe(
          map((mail) => MailActions.openMailSuccess({ mail })),
          catchError((error) => of(MailActions.openMailFailure({ error })))
        )
      )
    )
  );

  sendMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.sendMail),
      concatMap((action) =>
        this.mailService
          .sendMail(
            action.userId,
            action.mailTarget,
            action.subject,
            action.message
          )
          .pipe(
            map((mail) => MailActions.sendMailSuccess({ mail })),
            catchError((error) => of(MailActions.sendMailFailure({ error })))
          )
      )
    )
  );

  deleteMailIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.deleteMailIn),
      mergeMap((action) =>
        this.mailService.deleteIn(action.mailId).pipe(
          map(() => MailActions.deleteMailInSuccess()),
          catchError((error) => of(MailActions.deleteMailInFailure({ error })))
        )
      )
    )
  );

  deleteMailOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.deleteMailOut),
      mergeMap((action) =>
        this.mailService.deleteOut(action.mailId).pipe(
          map(() => MailActions.deleteMailOutSuccess()),
          catchError((error) => of(MailActions.deleteMailOutFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private mailService: MailService) {}
}
