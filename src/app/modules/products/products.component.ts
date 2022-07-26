import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as ProductSelector from 'src/app/modules/products/state/product.selectors';
import * as fromAuthSelectors from 'src/app/modules/auth/state/auth.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  vm$!: Observable<ProductSelector.ProductsViewModel>;
  user$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  faSearch = faSearch;
  faCartPlus = faCartPlus;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.store.dispatch(fromProductActions.loadProducts());

    this.user$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }
}
