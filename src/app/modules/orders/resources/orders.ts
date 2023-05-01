export interface Order {
  id?: string;
  _id?: string;
  user: {
    id?: string;
    _id?: string;
    username?: string;
    firstName?: string;
    email?: string;
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
      pricePurchase: number;
      price: number;
      extra1: number;
      extra2: number;
    }
  ];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  invoiceAddress: {
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
  itemsPrice: number;
  itemsPriceReturn: number;
  itemsCost: number;
  itemsCostReturn: number;
  taxPrice: number;
  taxPriceReturn: number;
  shippingPrice: number;
  shippingPriceReturn: number;
  giftPrice: number;
  extraPrice: number;
  primePrice: number;
  franchisePrice: number;
  totalPrice: number;
  totalCost: number;
  totalPriceReturn: number;
  isPaid: boolean;
  paidAt?: string;
  isSent: boolean;
  sentAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  isExtra: boolean;
  invoiceSent: boolean;
  invoiceAt?: string;
  returnReceived: boolean;
  returnReceivedAt?: string;
  voucher?: string;
  returnActive: boolean;
  returnClosed: boolean;
  refund: boolean;
  refundAt?: string;
}
