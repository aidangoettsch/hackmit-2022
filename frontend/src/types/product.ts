export interface ProductType {
  id: string;
  name: string;
  brandName: string;
  size: string;
  imageUrl: string;
  priceString: string;
  sustainable: boolean | string;
}

export interface ExistingOrderType {
  time: string;
  price: number;
  status: number;
  users: {
    name: string;
    location: string;
    host: boolean;
  }[]
}

export interface OrderItem {
  id: string;
  quantity: number;
}
