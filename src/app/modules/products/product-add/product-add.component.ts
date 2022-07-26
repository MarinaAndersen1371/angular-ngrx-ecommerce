import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { faHome, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { addProduct } from 'src/app/modules/products/state/product.actions';
import { AppState } from 'src/app/store';
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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.store.dispatch(
      addProduct({
        name: f.value.name,
        description: f.value.description,
        price: f.value.price,
        quantity: f.value.quantity,
        imageUrl: f.value.imageUrl,
      })
    );
  }
}
