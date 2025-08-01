"use client";

import Image from "next/image";
import { useEffect } from "react";



export const MainBanner = () => {

useEffect(() => {
  console.log("api URL is", process.env.NEXT_PUBLIC_BASE_URL);
}, []);

  return (
    <div className="h-96 relative my-4">
      <Image
        src="/images/add.jpg"
        fill
        style={{
          objectFit: 'cover', 
        }}
        priority
        alt="main-banner"
      />
    </div>
  );
};
