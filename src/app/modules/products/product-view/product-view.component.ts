import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowLeft,
  faCartPlus,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { Product } from 'src/app/modules/products/resources/product';
import { User } from 'src/app/modules/auth/resources/auth';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  productId!: string | null;
  userId!: any;
  user$!: Observable<any>;
  vm$!: Observable<any>;
  faArrowLeft = faArrowLeft;
  faCartPlus = faCartPlus;
  faMinus = faMinus;
  faPlus = faPlus;
  ngSelectWarranty = 'No';
  ngSelectGift = 'No';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.vm$ = this.store.pipe(
        select(fromProductSelectors.selectProductViewModel)
      );
      this.store.dispatch(
        fromProductActions.loadProduct({ id: this.productId })
      );
    }

    const user: User =
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') || '');

    if (user) {
      this.userId = user._id;
    }
  }

  addToCart(product: Product, f: NgForm): void {
    if (this.userId) {
      this.store.dispatch(
        fromUserActions.addToCart({
          _id: this.userId,
          item: product,
          qty: f.value.qty,
          warranty: f.value.warranty,
          gift: f.value.gift,
        })
      );
      this.router.navigate(['/auth/usercart', this.userId]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
