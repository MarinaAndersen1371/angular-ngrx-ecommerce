import { createReducer, on } from '@ngrx/store';
import * as ProductActions from 'src/app/modules/products/state/product.actions';
import { Product } from 'src/app/modules/products/resources/product';

export const productsFeatureKey = 'products';

export interface State {
  products: Product[];
  product: Product | {};
  isLoading: boolean | null;
  error: any | null;
}

export const initialState: State = {
  products: [],
  product: {},
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductActions.loadProducts,
    ProductActions.loadAdminProducts,
    ProductActions.loadProduct,
    ProductActions.loadAdminProduct,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),

  on(ProductActions.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      error: null,
    };
  }),

  on(
    ProductActions.loadProductSuccess,
    ProductActions.addProductSuccess,
    ProductActions.upsertProductSuccess,
    (state, action) => {
      return {
        ...state,
        product: action.product,
        error: null,
      };
    }
  ),

  on(ProductActions.deleteProduct, (state, action) => {
    return {
      ...state,
      product: action.productId,
      error: null,
    };
  }),
  on(ProductActions.deleteProductSuccess, (state) => {
    return {
      ...state,
      error: null,
    };
  }),

  on(
    ProductActions.loadProductFailure,
    ProductActions.loadProductsFailure,
    ProductActions.addProductFailure,
    ProductActions.upsertProductFailure,
    ProductActions.deleteProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
