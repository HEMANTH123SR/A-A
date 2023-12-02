import React from "react";
import ProductCollection from "@/app/components/ProductCollection";
import Pagination from "@/app/components/Pagination";
const HomePage = () => {
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
