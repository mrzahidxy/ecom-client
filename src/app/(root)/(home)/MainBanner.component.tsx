import Image from "next/image";

export const MainBanner = () => {
  return (
    <div className="h-96 relative my-4">
      <Image
        src="/images/add.jpg"
        fill={true}
        alt="main-banner"
        objectFit="cover"
      />
    </div>
  );
};
