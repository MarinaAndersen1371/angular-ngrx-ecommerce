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
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromUserActions from 'src/app/modules/auth/state/user.actions';
import * as fromProductSelectors from 'src/app/modules/products/state/product.selectors';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  vm$!: Observable<fromProductSelectors.ProductViewModel>;
  productId!: string | null;
  id!: any;
  userId!: any;
  userName!: any;
  faArrowLeft = faArrowLeft;
  faCartPlus = faCartPlus;
  faMinus = faMinus;
  faPlus = faPlus;
  ngSelectWarranty = 'No';
  ngSelectGift = 'No';
  ngSelectRating = 'Select';
  ngSelectExtra1 = 'No';
  ngSelectExtra2 = 'No';

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
      this.userName = user.firstName;
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
          extra1: f.value.extra1,
          extra2: f.value.extra2,
        })
      );
      this.router.navigate(['/auth/usercart', this.userId]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  createReview(fReview: NgForm): void {
    if (this.userId) {
      this.store.dispatch(
        fromProductActions.reviewProduct({
          id: this.productId,
          userId: this.userId,
          userName: this.userName,
          rating: fReview.value.rating,
          comment: fReview.value.comment,
        })
      );
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
