import { TProduct } from "@/models";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";

const ProductsComponent = dynamic(
  () => import("@/components/common/Products.component"),
  { ssr: false }
);
const AddToCartComponent = dynamic(() => import("./AddToCart.component"), {
  ssr: false,
});

type Props = {
  params: {
    product: any;
  };
};

// Async function to fetch product data
const fetchProduct = async (slug: string): Promise<TProduct | null> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Product Page Component
const ProductPage = async ({ params }: Props) => {
  const { product } = params;

  // Fetch the product data
  const productData = await fetchProduct(product);

  // Handle case when product data is not found
  if (!productData) {
    return <div>Product not found</div>;
  }


  return (
    <div className="container space-y-16">
      <div className="grid grid-cols-3">
        <div className="relative w-full h-[400px]">
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="col-span-2 space-y-4 ml-12">
          <h1 className="font-semibold text-xl">{productData.name}</h1>
          <p>{productData.description}</p>
          <h4 className="font-semibold text-xl">${productData.price}</h4>

          <div className="flex">
         
              <div
                key={productData?.promotion?.id}
                className="flex flex-col bg-red-500 text-xs text-white py-1 px-2 rounded-sm"
              >
                <span>{productData?.promotion?.code ?? ""}</span>
                <span>Discount: {productData?.promotion?.discount} BDT</span>
              </div>
    
          </div>

          {/* <select name="color" className="w-36 border rounded-sm p-1 mr-6">
            {productData.color.map((color, index) => (
              <option value={color} key={index}>
                {color}
              </option>
            ))}
          </select> */}
          {/* <select name="size" className="w-32 border rounded-sm p-1">
            {productData.size.map((size, index) => (
              <option value={size} key={index}>
                {size}
              </option>
            ))}
          </select> */}

          <div className="space-x-7 pt-4">
            <AddToCartComponent productId={productData?.id} />

            {/* <button className="border border-blue-500 rounded-sm px-9 py-1 hover:bg-blue-500 hover:text-white transition duration-100 ease-in-out">
              Buy Now
            </button> */}
          </div>
        </div>
      </div>

      <div>
        <ProductsComponent />
      </div>
    </div>
  );
};

export default ProductPage;
