import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/auth/resources/auth';

export const loadUsers = createAction('[Users Component] Load Users');
export const loadAdminUsers = createAction('[Users List Component] Load Users');
export const loadUsersSuccess = createAction(
  '[User Effect] Load Users Success',
  props<{ users: any }>()
);
export const loadUsersFailure = createAction(
  '[Users Component] Load Users Failure',
  props<{ error: any }>()
);

//**********************/
export const deleteUser = createAction(
  '[User List Component] Delete User',
  props<{ userId: any }>()
);
export const deleteUserSuccess = createAction(
  '[User Effect] Delete User Success'
);
export const deleteUserFailure = createAction(
  '[User Effect] Delete User Failure',
  props<{ error: any }>()
);

//***************************/
export const loadUser = createAction(
  '[User View Component] Load User',
  props<{ _id: string }>()
);
export const loadUserSuccess = createAction(
  '[User Effect] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User Effect] Load User Failure',
  props<{ error: any }>()
);

//***************************/
export const updateUser = createAction(
  '[User Edit Component] Update User',
  props<{
    _id: string;
    firstName: string;
    username: string;
    email: string;
    phone: string;
    purpose: string;
    birthday: string;
    gender: string;
  }>()
);
export const updateUserSuccess = createAction(
  '[User Effect] Update User Success',
  props<{ user: any }>()
);
export const updateUserFailure = createAction(
  '[User Effect] Update User Failure',
  props<{ error: any }>()
);

//***************************/
export const addToCart = createAction(
  '[Product View Component] addToCart',
  props<{
    _id: string;
    item: any;
    qty: number;
    warranty: string;
    gift: string;
  }>()
);
export const addToCartSuccess = createAction(
  '[User Effect] addToCart Success',
  props<{ user: User }>()
);
export const addToCartFailure = createAction(
  '[User Effect] addToCart Failure',
  props<{ error: any }>()
);

//**************************/
export const removeFromCart = createAction(
  '[User Cart Component] removeFromCart',
  props<{
    _id: string;
    item: any;
  }>()
);
export const removeFromCartSuccess = createAction(
  '[User Effect] removeFromCart Success',
  props<{ user: User }>()
);
export const removeFromCartFailure = createAction(
  '[User Effect] removeFromCart Failure',
  props<{ error: any }>()
);

//***************************/
export const updateProfile = createAction(
  '[Profile Edit Component] Update Profile',
  props<{
    _id: string;
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
export const updateProfileSuccess = createAction(
  '[User Effect] Update Profile Success',
  props<{ user: any }>()
);
export const updateProfileFailure = createAction(
  '[User Effect] Update Profile Failure',
  props<{ error: any }>()
);
