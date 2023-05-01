import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadFranchiseProducts } from 'src/app/modules/products/state/product.actions';
import * as ProductSelector from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit {
  vm$!: Observable<ProductSelector.ProductsViewModel>;
  productId!: string;
  faSearch = faSearch;
  faTimes = faTimes;
  faCheck = faCheck;
  page = 1;
  pageSize = 6;
  collectionSize!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.store.dispatch(loadFranchiseProducts());
  }
}
