import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductsRoutingModule } from 'src/app/modules/products/products-routing.module';
import { ProductsComponent } from 'src/app/modules/products/products.component';
import { ProductViewComponent } from 'src/app/modules/products/product-view/product-view.component';
import { ProductListComponent } from 'src/app/modules/products/product-list/product-list.component';
import { ProductItemComponent } from 'src/app/modules/products/product-item/product-item.component';
import { ProductEditComponent } from 'src/app/modules/products/product-edit/product-edit.component';
import { ProductAddComponent } from 'src/app/modules/products/product-add/product-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromProduct from 'src/app/modules/products/state/product.reducers';
import { ProductEffects } from 'src/app/modules/products/state/product.effects';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductViewComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductAddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
    FontAwesomeModule,
    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductsModule {}
