import React from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data";

export const Categories = () => {
  return (
    <div className="w-full space-y-1">
      <h2 className="text-2xl font-semibold text-gray-800">
        Top Things to buy by Category
      </h2>
      <p className="text-gray-600">Customers Choice Best of the Best</p>
      <div className="w-full grid md:grid-cols-3 gap-2">
        {categories.map((category) => (
          <Link href={`category/${category.category}`} key={category.id}>
            <div className="w-full relative cursor-pointer group rounded-md">
              <span className="w-full z-10 absolute text-xl bottom-0 p-2 font-semibold text-white bg-black bg-opacity-20 shadow-md">
                {category.title}
              </span>
              <div className="h-[300px] relative opacity-100 group-hover:opacity-80 transition ease-in-out">
                <Image
                  src={category?.img}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "0% 10%",
                  }}
                  alt={category.title}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
