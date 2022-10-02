export interface ProductType {
  id: string;
  name: string;
  brandName: string;
  size: string;
  imageUrl: string;
  priceString: string;

  sustainable: boolean | string;
}

interface ExistingOrderType {
  time: string;
  count: number;
}

interface OrderItem {
  id: string;
  quantity: number;
}
