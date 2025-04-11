export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: string; 
  tags: string;
  image: string;
  promotion: TPromotion;
  createdAt: string;
  updateAt: string;
};

export type TPromotion = {
  id: string;
  code: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  discount: number | null;
  slabs: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProductAPIResponse =  {
  collection: TProduct[];
}

export type TCartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: TProduct;
};
