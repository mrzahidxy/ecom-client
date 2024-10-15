import Image from "next/image";
import { RatingStar } from "./Rating.component";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const ProductCard = ({
  id,
  title,
  description,
  image,
}: {
  id: number;
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <Link href={`/product/${id}`}>
      <Card key={id} className="w-full relative cursor-pointer group">
        <div className="h-[200px] relative opacity-100 group-hover:opacity-80 transition ease-in-out">
          <Image src={image} layout="fill" objectFit="cover" alt={title} />
        </div>
        <h4 className="truncate text-gray-8000 text-lg font-semibold mt-2">{title}</h4>
        <RatingStar rating={4} />
        <p className="text-sm font-medium truncate text-gray-500 mt-2">{description}</p>
      </Card>
    </Link>
  );
};
