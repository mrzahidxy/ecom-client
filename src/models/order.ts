export interface TOrder {
  id: number;
  userId: number;
  netAmount: string;
  address: string;
  status: "CANCELLED" | "PENDING" | "COMPLETED" | "SHIPPED"; // You can extend this enum as per status options
  createdAt: string;
  updatedAt: string;
  products: TOrderProduct[];
}

export interface TOrderProduct {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface TPromotion {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  discount: number | null;
  slabs: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface TCartProduct {
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

export interface TCartOrder {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: TCartProduct;
};

