import { ProductCard } from "@/components/common";
import { publicRequest } from "@/healper/privateRequest";
import { TProduct } from "@/models";

const fetchPromotion = async (slug: string): Promise<any> => {
  try {
    const response = await publicRequest.get(`/promotions/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return null;
  }
};

export default async function PromotionPage({ params }: any) {
  const promotion = await fetchPromotion(params.slug);

  console.log("promotion", promotion);

  if (!promotion) return <div>Not Found</div>;

  return (
    <div className="container space-y-4">
      <h1 className="text-2xl font-medium">{promotion?.title}</h1>
      <div className="flex flex-col justify-between">
        <span>
          {promotion.startDate.split("T")[0]} -{" "}
          {promotion.endDate.split("T")[0]}
        </span>
        <span>{promotion.code}</span>
        <span>
          {promotion?.type === "percentage"
            ? `${promotion?.discount}%`
            : `${promotion?.discount}BDT`}
        </span>
      </div>
      <div className="w-full md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {promotion?.products.map(({ product }: { product: TProduct }) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            description={product.description}
            image={product.image ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
