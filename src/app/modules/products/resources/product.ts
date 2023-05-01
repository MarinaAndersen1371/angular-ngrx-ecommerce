export interface Product {
  id?: string;
  _id?: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  pricePurchase: number;
  price: number;
  imageUrl: string;
  quantity: number;
  extra: boolean;
  rating: number;
  numReviews: number;
  reviewSchema?: {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
  };
  lastModified?: string;
  modifiedBy?: string;
  deleted: boolean;
}
