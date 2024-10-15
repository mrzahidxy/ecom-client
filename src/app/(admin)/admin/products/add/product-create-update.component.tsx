"use client";

import { Formik } from "formik";
import { ProductForm } from "./product-form.component";
import { InitialValue, ProductCreate, ProductSchema } from "./form.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import privateRequest from "@/healper/privateRequest";

export const ProductCreateUpdate = ({ params }: any) => {
  const router = useRouter();
  // const params = useSearchParams();

  // const slug = params.get("slug");

  console.log(params)

  const handleSubmit = async (values: ProductCreate) => {
    console.log(handleSubmit);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    if (typeof values.image === "string" || values.image instanceof Blob) {
      formData.append("image", values.image);
    }
    formData.append("tags", "women, saree");

    const response = await privateRequest.post("/products", formData);
    if (response.status === 201) {
      router.push("/admin/products");
    }
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={InitialValue}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          <ProductForm />
        </Formik>
      </CardContent>
    </Card>
  );
};
