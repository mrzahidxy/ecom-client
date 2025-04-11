import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { publicRequest } from "@/healper/privateRequest";
import Link from "next/link";

// Async function to fetch product data
const fetchPromotion = async (
  tags?: string
): Promise<{ collection: any[] } | null> => {
  try {
    const response = await publicRequest.get(`/promotions`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return null;
  }
};

export default async function SpecialOffers() {
  const promotions = await fetchPromotion();

  if (!promotions || promotions.collection.length === 0) {
    return <div>Currently there are no special offers</div>;
  }
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8">Special Offers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.collection.map((promotion: any) => (
            <Card className="bg-white text-black ">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                  {promotion.title}
                </h4>
                <p className="mb-4">
                  Get{" "}
                  {promotion?.type === "PERCENTAGE"
                    ? promotion.discount + "%"
                    : promotion.discount + "BDT"}{" "}
                  off on your order.
                </p>
                <Link href={`/promotion/${promotion.id}`}>
                <Button variant="outline">
                  Shop Now
                </Button>
               </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
