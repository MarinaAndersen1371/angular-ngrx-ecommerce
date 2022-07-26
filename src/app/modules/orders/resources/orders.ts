export interface Order {
  id?: string;
  _id?: string;
  user: {
    id?: string;
    _id?: string;
    username: string;
    email: string;
    isadmin?: boolean;
  };
  orderItems: [
    {
      id: string;
      name: string;
      quantity: number;
      warranty: number;
      gift: number;
      discount: number;
      imageUrl: string;
      description: string;
      price: number;
    }
  ];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payment: {
    method: string;
    account: string;
  };
  primePrice: number;
  franchisePrice: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: string;
  isSent?: boolean;
  sentAt?: string;
}
