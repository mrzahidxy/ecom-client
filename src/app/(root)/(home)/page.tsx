import Products from "@/components/common/Products.component";
import { Categories } from "./Categories.component";
import { MainBanner } from "./MainBanner.component";
import SpecialOffers from "./SpecialOffers.component";

const HomePage = () => {
  return (
    <div className="container space-y-16 relative">
      <MainBanner />
      <Categories />

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">All Products</h3>
        <Products />
      </div>

      <SpecialOffers />
    </div>
  );
};

export default HomePage;
