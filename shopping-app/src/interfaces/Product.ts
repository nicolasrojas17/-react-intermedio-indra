export interface Product {
  id: number;
  title: string;
  price: number;
  priceDiscount: number;
  description: string;
  discount: number;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
