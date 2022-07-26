import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/modules/products/resources/product';

/*****LOAD PRODUCTS ** */
export const loadProducts = createAction('[Products Component] Load Products');

export const loadAdminProducts = createAction(
  '[Products List Component] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product Effect] Load Products Success',
  props<{ products: any }>()
);

export const loadProductsFailure = createAction(
  '[Products Component] Load Products Failure',
  props<{ error: any }>()
);

/*****LOAD INDIVIDUAL PRODUCT ** */
export const loadProduct = createAction(
  '[Product View Component] Load Product',
  props<{ id: string }>()
);

export const loadAdminProduct = createAction(
  '[Product Item Component] Load Product',
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  '[Product Effect] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  '[Product Effect] Load Product Failure',
  props<{ error: any }>()
);

/*****ADD INDIVIDUAL PRODUCT ** */
export const addProduct = createAction(
  '[Product Add Component] Add Product',
  props<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>()
);

export const addProductSuccess = createAction(
  '[Product Effect] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Product Effect] Add Product Failure',
  props<{ error: any }>()
);

/*****UPDATE INDIVIDUAL PRODUCT ** */
export const upsertProduct = createAction(
  '[Product Edit Component] Upsert Product',
  props<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>()
);
export const upsertProductSuccess = createAction(
  '[Product Effect] Upsert Product Success',
  props<{ product: Product }>()
);
export const upsertProductFailure = createAction(
  '[Product Effect] Upsert Product Failure',
  props<{ error: any }>()
);

/*****DELETE INDIVIDUAL PRODUCT ** */

export const deleteItemProduct = createAction(
  '[Product Item Component] Delete Product',
  props<{ productId: any }>()
);

export const deleteProduct = createAction(
  '[Product List Component] Delete Product',
  props<{ productId: any }>()
);

export const deleteProductSuccess = createAction(
  '[Product Effect] Delete Product Success'
);
export const deleteProductFailure = createAction(
  '[Product Effect] Delete Product Failure',
  props<{ error: any }>()
);
