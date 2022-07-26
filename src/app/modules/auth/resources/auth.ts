export interface User {
  id?: string;
  _id?: string;
  firstName: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  birthday: string;
  gender: string;
  purpose: string;
  isadmin: boolean;
  isManager: boolean;
  isPrime: boolean;
  isFranchise: boolean;
  coupon?: string;
  cart?: [
    {
      id?: string;
      _id?: string;
      name: string;
      imageUrl: string;
      description: string;
      price: number;
      quantity: number;
      warranty: number;
      gift: number;
      discount: number;
    }
  ];
  subtotal?: number;
  qtyItems?: number;
}
