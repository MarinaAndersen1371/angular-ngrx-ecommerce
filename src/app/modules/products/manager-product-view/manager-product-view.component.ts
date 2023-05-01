import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerProduct } from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-manager-product-view',
  templateUrl: './manager-product-view.component.html',
  styleUrls: ['./manager-product-view.component.scss'],
})
export class ManagerProductViewComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  productId: any;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(loadManagerProduct({ id: this.productId }));
    }
  }
}
