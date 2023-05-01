import { createReducer, on } from '@ngrx/store';
import * as ProductActions from 'src/app/modules/products/state/product.actions';
import { Product } from 'src/app/modules/products/resources/product';

export const productsFeatureKey = 'products';

export interface State {
  products: Product[];
  topProducts: Product[];
  statistics: any;
  product: Product | {};
  isLoading: boolean | null;
  error: any | null;
}

export const initialState: State = {
  products: [],
  topProducts: [],
  statistics: {},
  product: {},
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductActions.loadProducts,
    ProductActions.loadAdminProducts,
    ProductActions.loadManagerProducts,
    ProductActions.loadProduct,
    ProductActions.loadAdminProduct,
    ProductActions.loadManagerProduct,
    ProductActions.loadFranchiseProducts,
    ProductActions.loadFranchiseProduct,
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
      topProducts: action.topProducts,
      statistics: action.statistics,
      error: null,
    };
  }),

  on(
    ProductActions.loadProductSuccess,
    ProductActions.addProductSuccess,
    ProductActions.upsertProductSuccess,
    ProductActions.reviewProductSuccess,
    (state, action) => {
      return {
        ...state,
        product: action.product,
        error: null,
      };
    }
  ),

  on(
    ProductActions.deleteProduct,
    ProductActions.deleteManagerProduct,
    (state, action) => {
      return {
        ...state,
        product: action.productId,
        error: null,
      };
    }
  ),
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
    ProductActions.reviewProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
