import Products from "@/ui/common/Products.component";
import { Categories } from "./Categories.component";
import { MainBanner } from "./MainBanner.component";

type Props = {};

const HomePage = () => {
  return (
    <div className="container space-y-16 relative">
      <MainBanner />
      <Categories />

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">All Products</h3>
        <Products />
        <div className="w-full flex justify-center">
          <span className="px-6 py-2 border border-blue-400 text-black rounded-md cursor-pointer font-medium hover:bg-blue-500 hover:text-white transition duration-100 ease-in-out">
            See More
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
