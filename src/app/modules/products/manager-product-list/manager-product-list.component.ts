import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch,
  faPlus,
  faTrash,
  faEdit,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as ProductSelector from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-manager-product-list',
  templateUrl: './manager-product-list.component.html',
  styleUrls: ['./manager-product-list.component.scss'],
})
export class ManagerProductListComponent implements OnInit {
  vm$!: Observable<ProductSelector.ProductsViewModel>;
  productId!: string;
  faSearch = faSearch;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faTimes = faTimes;
  faCheck = faCheck;
  page = 1;
  pageSize = 6;
  collectionSize!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.store.dispatch(fromProductActions.loadManagerProducts());
  }

  deleteProduct(_id: any) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(fromProductActions.deleteProduct({ productId: _id }));
      this.store.dispatch(fromProductActions.loadManagerProducts());
    }
  }
}
