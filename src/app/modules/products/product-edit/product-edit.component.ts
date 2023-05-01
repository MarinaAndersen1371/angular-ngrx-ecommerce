import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { ProductService } from 'src/app/modules/products/resources/product.service';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import {
  keyPressNumbers,
  keyPressNumbersWithDecimal,
} from 'src/app/modules/products/resources/helpers';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  model: any = {};
  productId: any;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  keyPressNumbers = keyPressNumbers;
  keyPressNumbersWithDecimal = keyPressNumbersWithDecimal;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.service
      .getProduct(this.productId)
      .subscribe((product) => (this.model = product));
  }

  onSubmit() {
    this.store.dispatch(
      fromProductActions.upsertProduct({
        id: this.productId,
        name: this.model.name,
        brand: this.model.brand,
        category: this.model.category,
        description: this.model.description,
        pricePurchase: this.model.pricePurchase,
        price: this.model.price,
        quantity: this.model.quantity,
        extra: this.model.extra,
        imageUrl: this.model.imageUrl,
        modifiedBy: 'Admin',
      })
    );
  }
}
