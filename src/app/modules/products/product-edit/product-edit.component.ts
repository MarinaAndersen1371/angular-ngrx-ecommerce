import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { faHome, faEdit } from '@fortawesome/free-solid-svg-icons';

import { ProductService } from 'src/app/modules/products/resources/product.service';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import {
  keyPressNumbers,
  keyPressNumbersWithDecimal,
} from 'src/app/modules/products/resources/helpers';

import { AppState } from 'src/app/store';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  model: any = {};
  productId: any;
  faHome = faHome;
  faEdit = faEdit;
  keyPressNumbers = keyPressNumbers;
  keyPressNumbersWithDecimal = keyPressNumbersWithDecimal;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.spinner.show();
    this.service
      .getProduct(this.productId)
      .subscribe((product) => (this.model = product));
    setTimeout(() => {
      this.spinner.hide();
    }, 300);
  }

  onSubmit() {
    this.store.dispatch(
      fromProductActions.upsertProduct({
        id: this.productId,
        name: this.model.name,
        description: this.model.description,
        price: this.model.price,
        quantity: this.model.quantity,
        imageUrl: this.model.imageUrl,
      })
    );
  }
}
