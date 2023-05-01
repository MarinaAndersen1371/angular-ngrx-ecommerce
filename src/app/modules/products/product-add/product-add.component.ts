import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { faHome, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { addProduct } from 'src/app/modules/products/state/product.actions';
import {
  keyPressNumbers,
  keyPressNumbersWithDecimal,
} from 'src/app/modules/products/resources/helpers';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  faHome = faHome;
  faCartPlus = faCartPlus;
  keyPressNumbers = keyPressNumbers;
  keyPressNumbersWithDecimal = keyPressNumbersWithDecimal;
  ngSelectExtra = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.store.dispatch(
      addProduct({
        name: f.value.name,
        brand: f.value.brand,
        category: f.value.category,
        description: f.value.description,
        pricePurchase: f.value.pricePurchase,
        price: f.value.price,
        quantity: f.value.quantity,
        extra: f.value.extra,
        imageUrl: f.value.imageUrl,
        modifiedBy: 'Admin',
      })
    );
  }
}
