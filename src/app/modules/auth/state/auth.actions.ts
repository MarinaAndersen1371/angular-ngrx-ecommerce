import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/auth/resources/auth';

export const loginPage = createAction(
  '[Login Component] Login User',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);

export const registerPage = createAction(
  '[Register Component] Register User',
  props<{
    firstName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    purpose: string;
    birthday: string;
    gender: string;
  }>()
);
export const registerSuccess = createAction(
  '[Auth Effect] Register User Success',
  props<{ user: User }>()
);
export const registerFailure = createAction(
  '[Auth Effect] Register User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth Links Component] Logout User');

export const browserReload = createAction(
  '[Core Component] Browser Reload',
  props<{ user: User }>()
);
