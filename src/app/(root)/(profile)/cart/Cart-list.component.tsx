import { TCartOrder } from "@/models/order";
import Image from "next/image";

function CartList({ carts }: { carts: TCartOrder[] }) {


  return (
    <div className="space-y-6 col-span-2">
      <h4 className="text-xl">Items</h4>
      <div className="space-y-4">
        {carts?.map((cartItem: TCartOrder, i: number) => (
          <div
            key={i}
            className="grid grid-cols-3 dgroup justify-between gap-4 hover:shadow-sm hover:bg-gray-100 transition ease-in-out duration-100"
          >
            <div className="relative w-24 h-24">
              <Image src={cartItem?.product?.image} alt="" layout="fill" />
            </div>
            <div className="col-span-2 space-y-1">
              <span className="font-semibold text-xl">
                {cartItem?.product?.name}
              </span>
              <div>
                <span className="font-medium">Price</span>{" "}
                <span>
                  {cartItem.quantity * parseInt(cartItem.product.price)}
                </span>
              </div>
              <div>
                <span className="font-medium">Quantity</span>{" "}
                <span>{cartItem.quantity}</span>
              </div>
              {cartItem?.product?.promotion && (
                <div>
                  <span>Discount</span>
                  <span>
                    {" "}
                    {cartItem?.product?.promotion?.type === "PERCENTAGE"
                      ? cartItem?.product?.promotion?.discount + "%"
                      : cartItem?.product?.promotion?.discount}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
