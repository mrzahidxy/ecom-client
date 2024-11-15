import Products from "@/components/common/Products.component";
import Filter from "./Filter.component";

type Props = {};

const CategoryPage = async ({ params }: { params?: { category?: string } }) => {
  const category = params?.category;
  return (
    <div className="container grid grid-cols-5 gap-4">
      <Filter />
      <div className="col-span-4 pl-4">
        <Products tags={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
