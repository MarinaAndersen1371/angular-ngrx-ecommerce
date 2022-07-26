import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from 'ngx-alerts';
import { tap } from 'rxjs/operators';

import * as fromAuthActions from 'src/app/modules/auth/state/auth.actions';
import * as fromTicketActions from 'src/app/pages/customer-support/state/ticket.actions';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class AlertEffects {
  checkingYourInformation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginPage, fromOrderActions.createOrderSuccess),
        tap(() =>
          this.alertService.info('Please check out your updates & account')
        )
      ),
    { dispatch: false }
  );

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((action) =>
          this.alertService.success(
            'Welcome Back ' + action.user.firstName + ' !'
          )
        )
      ),
    { dispatch: false }
  );

  welcome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.registerSuccess),
        tap((action) =>
          this.alertService.success('Welcome ' + action.user.firstName + ' !')
        )
      ),
    { dispatch: false }
  );

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() => this.alertService.danger('Unable to login'))
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alertService.warning('You are logged out'))
      ),
    { dispatch: false }
  );
  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alertService.info('Come Back Soon!'))
      ),
    { dispatch: false }
  );

  unableToLoadProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.loadProductsFailure),
        tap(() => this.alertService.danger('Unable to load products'))
      ),
    { dispatch: false }
  );

  successfullyCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.addProductSuccess,
          fromOrderActions.createOrderSuccess
        ),
        tap(() => this.alertService.success('Successfully created!'))
      ),
    { dispatch: false }
  );

  unableToCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.addProductFailure,
          fromOrderActions.createOrderFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger(
              'Unable to create, please verify data entry'
            );
          }, 500)
        )
      ),
    { dispatch: false }
  );

  upsertSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.upsertProductSuccess,
          fromUserActions.updateUserSuccess,
          fromUserActions.updateProfileSuccess
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Successfully updated!');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  unableToEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.upsertProductFailure,
          fromUserActions.updateUserFailure,
          fromUserActions.updateProfileFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger(
              'Unable to edit, please verify data entry'
            );
          }, 500)
        )
      ),
    { dispatch: false }
  );

  removeProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProduct,
          fromUserActions.removeFromCartSuccess
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.warning('Removed Product');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  successfullyDeleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProductSuccess,
          fromUserActions.deleteUserSuccess,
          fromTicketActions.deleteTicketSuccess
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Removed from Database');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  unableToDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProductFailure,
          fromUserActions.deleteUserFailure,
          fromTicketActions.deleteTicketFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger('Unable to delete');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private alertService: AlertService) {}
}
