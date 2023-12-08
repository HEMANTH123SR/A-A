import Link from "next/link";
import React from "react";

const AdminPage = () => {
  return (
    <div
      className="flex justify-center items-center w-full bg-white"
      style={{ height: "80vh" }}
    >
      <div className="flex flex-col  m:flex-row items-center justify-center space-y-8">
        <Link
          className="w-32 h-12 flex justify-center items-center text-white rounded-md bg-teal-600 font-sans font-semibold "
          href="admin/add-product"
        >
          Create Product
        </Link>
        <Link
          className="w-32 h-12 flex justify-center items-center text-white rounded-md bg-teal-600 font-sans font-semibold "
          href="admin/orders"
        >
          Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
