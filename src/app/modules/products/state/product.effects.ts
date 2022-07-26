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
      ofType(ProductActions.loadProducts, ProductActions.loadAdminProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            ProductActions.loadProductsSuccess({ products: products })
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
      ofType(ProductActions.loadProduct, ProductActions.loadAdminProduct),
      mergeMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) =>
            ProductActions.loadProductSuccess({ product: product })
          ),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      concatMap((action) =>
        this.productService
          .createProduct(
            action.name,
            action.description,
            action.price,
            action.quantity,
            action.imageUrl
          )
          .pipe(
            map((product) =>
              ProductActions.addProductSuccess({ product: product })
            ),
            catchError((error) =>
              of(ProductActions.addProductFailure({ error: error }))
            )
          )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.upsertProduct),
      mergeMap((action) =>
        this.productService
          .updateProduct(
            action.id,
            action.name,
            action.description,
            action.price,
            action.quantity,
            action.imageUrl
          )
          .pipe(
            map((product) =>
              ProductActions.upsertProductSuccess({ product: product })
            ),
            catchError((error) =>
              of(ProductActions.upsertProductFailure({ error }))
            )
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct, ProductActions.deleteItemProduct),
      mergeMap((action) =>
        this.productService.removeProduct(action.productId).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
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
