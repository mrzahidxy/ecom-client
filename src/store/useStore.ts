// store/useStore.ts
import privateRequest from "@/healper/privateRequest";
import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define TypeScript interfaces

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AddToCartResponse {
  message: string;
  statusCode: number;
  data: null | CartItem;
}

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface CartState {
  cartItems: CartItem[];
  message: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => void;
  clearMessage: () => void;
  placeOrder: () => Promise<void>;
}

// Create the Zustand store with persistence
const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        cartItems: [],
        message: "",
        isLoading: false,
        error: null,

        // Actions
        addToCart: async (productId: number, quantity: number) => {
          set({ isLoading: true, error: null });
          const payload = { productId, quantity };

          try {
            // Make a POST request to add item to cart
            const response = await privateRequest.post<AddToCartResponse>(
              "/carts",
              payload
            );
            const addedItem = response.data?.data;

            // Update the cartItems state
            set((state) => ({
              cartItems: addedItem
                ? [...state.cartItems, addedItem]
                : state.cartItems,
              message: response.data.message,
              isLoading: false,
            }));
          } catch (error: unknown) {
            let errorMsg: string;

            if (axios.isAxiosError(error)) {
              // Axios error
              errorMsg = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
              // Generic error
              errorMsg = error.message;
            } else {
              // Unknown error type
              errorMsg = "An unknown error occurred";
            }

            // Handle error and set message
            set({
              message: `Failed to add to cart: ${errorMsg}`,
              isLoading: false,
              error: errorMsg,
            });
          }
        },

        removeFromCart: (productId: number) => {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (item) => item.productId !== productId
            ),
            message: "Removed from cart.",
          }));
        },

        placeOrder: async () => {
          set({ isLoading: true, error: null }, false, "placeOrder/start");

          try {
            const response = await privateRequest.post("/orders");

            if (response.status === 201 || response.status === 200) {
              set(
                {
                  cartItems: [],
                  message: "Order placed successfully!",
                  isLoading: false,
                },
                false,
                "placeOrder/success"
              );
            } else {
              set(
                {
                  message: "Failed to place order.",
                  isLoading: false,
                },
                false,
                "placeOrder/failure"
              );
            }
          } catch (error: unknown) {
            let errorMsg: string;

            if (axios.isAxiosError(error)) {
              // Axios error
              errorMsg = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
              // Generic error
              errorMsg = error.message;
            } else {
              // Unknown error type
              errorMsg = "An unknown error occurred";
            }

            // Handle error and set message
            set(
              {
                message: `Failed to place order: ${errorMsg}`,
                isLoading: false,
                error: errorMsg,
              },
              false,
              "placeOrder/failure"
            );
          }
        },

        clearMessage: () => {
  

          set({ message: "", error: null });
          console.log("clear");
        },
      }),
      {
        name: "cart-storage", // Name of the localStorage key
      }
    )
  )
);
export default useCartStore;
