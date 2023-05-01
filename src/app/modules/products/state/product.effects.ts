import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from 'src/app/modules/products/resources/product.service';
import * as ProductActions from 'src/app/modules/products/state/product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductActions.loadProducts,
        ProductActions.loadAdminProducts,
        ProductActions.loadManagerProducts,
        ProductActions.loadFranchiseProducts
      ),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(({ products, topProducts, statistics }) =>
            ProductActions.loadProductsSuccess({
              products,
              topProducts,
              statistics,
            })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.loadProduct,
        ProductActions.loadAdminProduct,
        ProductActions.loadManagerProduct,
        ProductActions.loadFranchiseProduct
      ),
      mergeMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) => ProductActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct, ProductActions.addManagerProduct),
      concatMap((action) =>
        this.productService
          .createProduct(
            action.name,
            action.brand,
            action.category,
            action.description,
            action.pricePurchase,
            action.price,
            action.quantity,
            action.extra,
            action.imageUrl,
            action.modifiedBy
          )
          .pipe(
            map((product) => ProductActions.addProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.addProductFailure({ error: error }))
            )
          )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.upsertProduct, ProductActions.updateManagerProduct),
      mergeMap((action) =>
        this.productService
          .updateProduct(
            action.id,
            action.name,
            action.brand,
            action.category,
            action.description,
            action.pricePurchase,
            action.price,
            action.quantity,
            action.extra,
            action.imageUrl,
            action.modifiedBy
          )
          .pipe(
            map((product) => ProductActions.upsertProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.upsertProductFailure({ error }))
            )
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.deleteProduct,
        ProductActions.deleteItemProduct,
        ProductActions.deleteManagerProduct
      ),
      mergeMap((action) =>
        this.productService.removeProduct(action.productId).pipe(
          map((product) => ProductActions.deleteProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  reviewProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.reviewProduct),
      concatMap((action) =>
        this.productService
          .reviewProduct(
            action.id,
            action.userName,
            action.userId,
            action.rating,
            action.comment
          )
          .pipe(
            map((product) => ProductActions.reviewProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.reviewProductFailure({ error: error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
