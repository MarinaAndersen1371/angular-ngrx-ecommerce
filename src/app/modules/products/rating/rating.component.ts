import { Component, OnInit, Input } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() value!: number;
  @Input() text!: string;

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  constructor() {}

  ngOnInit(): void {}
}
