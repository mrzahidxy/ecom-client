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
  