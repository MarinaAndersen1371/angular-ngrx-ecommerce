import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadFranchiseProduct } from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-franchise-product',
  templateUrl: './franchise-product.component.html',
  styleUrls: ['./franchise-product.component.scss'],
})
export class FranchiseProductComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  faArrowLeft = faArrowLeft;
  productId: any;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(loadFranchiseProduct({ id: this.productId }));
    }
  }
}
