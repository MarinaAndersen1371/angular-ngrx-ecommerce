import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as ProductReducer from 'src/app/modules/products/state/product.reducers';
import { Product } from 'src/app/modules/products/resources/product';

export const selectProductsState = createFeatureSelector<ProductReducer.State>(
  ProductReducer.productsFeatureKey
);

export interface ProductsViewModel {
  products: Product[];
  topProducts: Product[];
  statistics: any;
  error: any;
}

export const selectProductsViewModel = createSelector(
  selectProductsState,
  (state: ProductReducer.State): ProductsViewModel => {
    return {
      products: state.products,
      topProducts: state.topProducts,
      statistics: state.statistics,
      error: state.error,
    };
  }
);

export interface ProductViewModel {
  product: Product | {};
  error: any;
}

export const selectProductViewModel = createSelector(
  selectProductsState,
  (state: ProductReducer.State): ProductViewModel => {
    return {
      product: state.product,
      error: state.error,
    };
  }
);
