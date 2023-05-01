import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowLeft,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  productId: any;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(
        fromProductActions.loadAdminProduct({ id: this.productId })
      );
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(
        fromProductActions.deleteItemProduct({ productId: id })
      );
    }
  }
}
