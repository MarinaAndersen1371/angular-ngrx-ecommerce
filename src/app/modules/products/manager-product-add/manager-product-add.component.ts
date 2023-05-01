import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { faHome, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { addManagerProduct } from 'src/app/modules/products/state/product.actions';
import { AppState } from 'src/app/store';
import {
  keyPressNumbers,
  keyPressNumbersWithDecimal,
} from 'src/app/modules/products/resources/helpers';

@Component({
  selector: 'app-manager-product-add',
  templateUrl: './manager-product-add.component.html',
  styleUrls: ['./manager-product-add.component.scss'],
})
export class ManagerProductAddComponent implements OnInit {
  faHome = faHome;
  faCartPlus = faCartPlus;
  keyPressNumbers = keyPressNumbers;
  keyPressNumbersWithDecimal = keyPressNumbersWithDecimal;
  ngSelectExtra = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.store.dispatch(
      addManagerProduct({
        name: f.value.name,
        brand: f.value.brand,
        category: f.value.category,
        description: f.value.description,
        pricePurchase: f.value.pricePurchase,
        price: f.value.price,
        quantity: f.value.quantity,
        extra: f.value.extra,
        imageUrl: f.value.imageUrl,
        modifiedBy: 'Manager',
      })
    );
  }
}
