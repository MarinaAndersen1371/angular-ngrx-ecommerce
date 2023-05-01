import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from 'src/app/modules/products/products.component';
import { ProductViewComponent } from 'src/app/modules/products/product-view/product-view.component';
import { ProductListComponent } from 'src/app/modules/products/product-list/product-list.component';
import { ProductItemComponent } from 'src/app/modules/products/product-item/product-item.component';
import { ProductEditComponent } from 'src/app/modules/products/product-edit/product-edit.component';
import { ProductAddComponent } from 'src/app/modules/products/product-add/product-add.component';
import { ManagerProductListComponent } from 'src/app/modules/products/manager-product-list/manager-product-list.component';
import { ManagerProductViewComponent } from 'src/app/modules/products/manager-product-view/manager-product-view.component';
import { ManagerProductAddComponent } from 'src/app/modules/products/manager-product-add/manager-product-add.component';
import { ManagerProductEditComponent } from 'src/app/modules/products/manager-product-edit/manager-product-edit.component';
import { FranchiseListComponent } from 'src/app/modules/products/franchise-list/franchise-list.component';
import { FranchiseProductComponent } from 'src/app/modules/products/franchise-product/franchise-product.component';
import { AdminGuard } from 'src/app/modules/auth/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/auth/resources/manager.guard';
import { FranchiseGuard } from 'src/app/modules/auth/resources/franchise.guard';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
  },
  //*********** Admin area ***/
  {
    path: 'product-item/:id',
    canActivate: [AdminGuard],
    component: ProductItemComponent,
  },
  {
    path: 'product-add',
    canActivate: [AdminGuard],
    component: ProductAddComponent,
  },
  {
    path: 'product-edit/:id',
    canActivate: [AdminGuard],
    component: ProductEditComponent,
  },
  {
    path: 'product-list',
    canActivate: [AdminGuard],
    component: ProductListComponent,
  },
  //*********** Manager area ***/
  {
    path: 'manager/product-item/:id',
    canActivate: [ManagerGuard],
    component: ManagerProductViewComponent,
  },
  {
    path: 'manager/product-add',
    canActivate: [ManagerGuard],
    component: ManagerProductAddComponent,
  },
  {
    path: 'manager/product-edit/:id',
    canActivate: [ManagerGuard],
    component: ManagerProductEditComponent,
  },
  {
    path: 'manager/product-list',
    canActivate: [ManagerGuard],
    component: ManagerProductListComponent,
  },
  //*********** Franchise area ***/
  {
    path: 'franchise-list',
    canActivate: [FranchiseGuard],
    component: FranchiseListComponent,
  },
  {
    path: 'franchise-product/:id',
    canActivate: [FranchiseGuard],
    component: FranchiseProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
