"use client";
import React, { useEffect } from "react";
import ProductCollection from "@/app/components/ProductCollection";
import Pagination from "@/app/components/Pagination";
import { getImage } from "@/app/appwrite/appwrite";
const HomePage = () => {
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <ProductCollection />
      <div className="flex w-full justify-center py-10">
        <Pagination />
      </div>
    </div>
  );
};

export default HomePage;
