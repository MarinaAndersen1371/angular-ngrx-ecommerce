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
  testPaid: boolean;
  testScore: number;
  isadmin: boolean;
  isManager: boolean;
  isPrime: boolean;
  isFranchise: boolean;
  deleted: boolean;
  coupon?: string;
  lastLogin?: string;
  lastModified?: string;
  modifiedBy?: string;
  franchiseFrom?: string;
  primeFrom?: string;
  test?: {
    test1: string;
    test2: string;
    test3: string;
    test4: string;
    test5: string;
  };
  cart?: [
    {
      id?: string;
      _id?: string;
      name: string;
      imageUrl: string;
      description: string;
      pricePurchase: number;
      price: number;
      quantity: number;
      warranty: number;
      gift: number;
      discount: number;
      extra1: number;
      extra2: number;
    }
  ];
  subtotal?: number;
}
