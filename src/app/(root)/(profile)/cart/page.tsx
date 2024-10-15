"use client";


import privateRequest from "@/healper/privateRequest";
import { TCartItem } from "@/models";
import useCartStore from "@/store/useStore";
import CustomButton from "@/ui/common/Button.component";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [carts, setCarts] = useState<TCartItem[]>([]);
  const isLoading = useCartStore((state) => state.isLoading);
  const message = useCartStore((state) => state.message);
  const placeOrder = useCartStore((state) => state.placeOrder);
  const clearMessage = useCartStore((state) => state.clearMessage);
  const error = useCartStore((state) => state.error);

  const fetchCart = async () => {
    try {
      const response = await privateRequest.get("/carts");
      setCarts(response.data.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  let totalPrice = 0;

  for (const item of carts) {
    totalPrice += item.quantity * parseInt(item.product.price, 10);
  }

  const handleOrder = async () => {
    await placeOrder();
    await fetchCart();
  };

  // Automatically clear message or error after a delay
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);

      return () => clearTimeout(timer); // Clean up timer
    }
  }, [message, error]);

  return (
    <div className="container grid grid-cols-3 gap-16">
      <div className="space-y-6 col-span-2">
        <h4 className="text-xl">Items</h4>
        <div className="space-y-4">
          {carts?.map((cart, i) => (
            <div
              key={i}
              className="grid grid-cols-3 dgroup justify-between gap-4 hover:shadow-sm hover:bg-gray-100 transition ease-in-out duration-100"
            >
              <div className="relative w-24 h-24">
                <Image
                  src={cart?.product?.image}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="col-span-2 space-y-1">
                <span className="font-semibold text-xl">
                  {cart?.product?.name}
                </span>
                <div>
                  <span className="font-medium">Price</span>{" "}
                  <span>{cart.quantity * parseInt(cart.product.price)}</span>
                </div>
                <div>
                  <span className="font-medium">Quantity</span>{" "}
                  <span>{cart.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        <h4 className="text-xl">Order Summary</h4>
        <div className="grid grid-cols-2 space-y-2">
          <span>Sub-total</span> <span>{totalPrice}</span>
          <span>Shipping Charge</span> <span>0</span>
          <span>Discount</span> <span>0</span>
          <span className="font-semibold text-xl">Total</span>{" "}
          <span className="font-semibold text-xl">{totalPrice}</span>
        </div>

        <div className="space-x-4 pt-4">
          <CustomButton
            onClick={handleOrder}
            loading={isLoading}
            title="Checkout Now"
            className="w-44 py-2"
          />
        </div>
        <p className="text-green-500">{message}</p>
      </div>
    </div>
  );
};

export default CartPage;
