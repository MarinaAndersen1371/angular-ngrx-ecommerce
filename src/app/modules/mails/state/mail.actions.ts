import { createAction, props } from '@ngrx/store';
import { Mail } from 'src/app/modules/mails/resources/mail';

export const loadMails = createAction('[Mails Component] Load Mails');

export const loadMailsSuccess = createAction(
  '[Mail Effect] Load Mails Success',
  props<{ mails: Mail[] }>()
);
export const loadMailsFailure = createAction(
  '[Mails Component] Load Mails Failure',
  props<{ error: any }>()
);

//******************/
export const loadMail = createAction(
  '[Mail Component] Load Mail',
  props<{ _id: string }>()
);

export const loadMailSuccess = createAction(
  '[Mail Effect] Load Mail Success',
  props<{ mail: Mail }>()
);
export const loadMailFailure = createAction(
  '[Mail Component] Load Mail Failure',
  props<{ error: any }>()
);
//******************/
export const deleteMailIn = createAction(
  '[My Mails Component] Delete MailIn',
  props<{ mailId: any }>()
);
export const deleteMailInSuccess = createAction(
  '[Mail Effect] Delete MailIn Success'
);
export const deleteMailInFailure = createAction(
  '[Mail Effect] Delete MailIn Failure',
  props<{ error: any }>()
);
//******************/
export const deleteMailOut = createAction(
  '[My Mails Component] Delete MailOut',
  props<{ mailId: any }>()
);
export const deleteMailOutSuccess = createAction(
  '[Mail Effect] Delete MailOut Success'
);
export const deleteMailOutFailure = createAction(
  '[Mail Effect] Delete MailOut Failure',
  props<{ error: any }>()
);
//******************/
export const statusMail = createAction(
  '[Mails Component] Status Mail',
  props<{ mailId: string }>()
);

export const statusMailSuccess = createAction(
  '[Mail Effect] Status Mail Success',
  props<{ mail: Mail }>()
);
export const statusMailFailure = createAction(
  '[Mail Component] Status Mail Failure',
  props<{ error: any }>()
);

//******************/
export const openMail = createAction(
  '[Mails Component] open Mail',
  props<{ mailId: string }>()
);

export const openMailSuccess = createAction(
  '[Mail Effect] Open Mail Success',
  props<{ mail: Mail }>()
);
export const openMailFailure = createAction(
  '[Mail Component] Open Mail Failure',
  props<{ error: any }>()
);

//******************/
export const sendMail = createAction(
  '[Mails Component] Mails',
  props<{
    userId: string;
    mailTarget: string;
    subject: string;
    message: string;
  }>()
);

export const sendMailSuccess = createAction(
  '[Mails Effect] Mails Success',
  props<{ mail: Mail }>()
);

export const sendMailFailure = createAction(
  '[Mails Effect] Mails Failure',
  props<{ error: any }>()
);
