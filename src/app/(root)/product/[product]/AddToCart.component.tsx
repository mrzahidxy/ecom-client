"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useStore";

type CartComponentProps = {
  productId: number;
};

const CartComponent: React.FC<CartComponentProps> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1); 
  const addToCart = useCartStore((state) => state.addToCart);
  const message = useCartStore((state) => state.message);
  const isLoading = useCartStore((state) => state.isLoading);
  const error = useCartStore((state) => state.error);
  const clearMessage = useCartStore((state) => state.clearMessage);

  console.log(message)

  const handleAddToCart = async () => {
    await addToCart(productId, quantity);

    // Optionally, clear the message after some time
    if (message || error) {
      setTimeout(() => {
        clearMessage();
      }, 3000);
    }
  };

  // Functions to handle quantity increase and decrease
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Button
          className="text-2xl bg-white text-black border-red-600 border-2 hover:bg-red-600 hover:text-white"
          onClick={decreaseQuantity}
          type="button"
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="text-xl font-medium">{quantity}</span>
        <Button
          className="text-2xl bg-white text-black border-green-600 border-2 hover:bg-green-600 hover:text-white"
          onClick={increaseQuantity}
          type="button"
        >
          +
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          {isLoading ? "Loading..." : "Add to Cart"}
        </Button>
      </div>
      {message && <p className="text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default CartComponent;
