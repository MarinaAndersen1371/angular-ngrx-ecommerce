import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from 'src/app/store';
import { Product } from 'src/app/modules/products/resources/product';
import { loadProducts } from 'src/app/modules/products/state/product.actions';
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
  searchTerm!: string;
  page = 1;
  pageSize = 6;
  collectionSize!: number;
  products!: Product[];

  constructor(private store: Store<AppState>, config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.vm$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.store.dispatch(loadProducts());

    this.user$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  search(value: any): void {
    if (this.products) {
      this.products = this.products.filter((val) =>
        val.name.toLowerCase().includes(value.target.value)
      );
      this.collectionSize = this.products.length;
    }
  }
}
