"use client";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  className?: string;
  icon?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

const CustomButton = ({ className, title, icon, loading, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex justify-center items-center gap-1 border  border-blue-500 rounded-sm py-1 hover:bg-blue-500 hover:text-white transition duration-100 ease-in-out ${className} `}
    >
      {loading && "Loading..."}
      {icon} {title}
    </button>
  );
};

export default CustomButton;
