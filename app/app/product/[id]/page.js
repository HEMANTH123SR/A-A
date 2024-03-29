"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProduct,
  getAccountDetails,
  deleteProduct,
  addCartProduct,
} from "@/app/appwrite/appwrite";

const Product = ({ params }) => {
  const Router = useRouter();
  const [prodcut, setProduct] = useState({});
  const [isProductFetched, setIsProductFetched] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(params.id);
        const res2 = await getAccountDetails();

        if (res.$id) {
          setProduct(res);
          setUserDetails(res2);
          setIsProductFetched(true);
        }
      } catch (e) {
        console.log("page.js :: product :: error", e);
      }
    };

    fetchProduct();
  }, []);

  const deleteHandler = async () => {
    try {
      const res = await deleteProduct(
        prodcut.$id,
        prodcut.multipleSareeImages,
        prodcut.coverImages
      );

      if (res) {
        Router.push("/");
      }
    } catch (e) {
      console.log("profile  page.js :: appwrite :: error ", e);
    }
  };
  const handleCart = async () => {
    if (userDetails?.$id) {
      const res = await addCartProduct(
        userDetails.$id,
        prodcut.$id,
        prodcut.name,
        prodcut.currentPrice,
        prodcut.colour,
        prodcut.coverImages
      );
      setSuccess(res);
    } else {
      setError(true);
    }
  };

  if (!isProductFetched) {
    return (
      <div
        style={{ height: "90vh" }}
        className="bg-white flex justify-center items-center"
      >
        <div className="flex justify-center items-center h-screen">
          <div className="relative inline-flex">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 bg-white">
        {userDetails?.labels[0] == "admin" ? (
          <div className="flex justify-center items-center pt-7">
            <button
              className="bg-teal-600  text-white font-sans h-10 w-24 rounded-md flex justify-center items-center text-lg font-semibold"
              onClick={deleteHandler}
            >
              delete
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="pt-8">
          <div className="flex items-center">
            <ol className="flex w-full items-center overflow-hidden">
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a href="#">Home</a>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a className="capitalize" href="#">
                  products
                </a>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a className="capitalize" href="#">
                  {prodcut.name}
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div className="col-span-5 grid grid-cols-2 gap-2.5">
            {prodcut.multipleSareeImages.map((url) => (
              <div
                key={url}
                className="col-span-1 transition duration-150 ease-in hover:opacity-90"
              >
                <img src={url} alt="nothing" className="w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="col-span-4 pt-8 lg:pt-0">
            <div className="mb-7 border-b border-gray-300 pb-7">
              <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                {prodcut.name}
              </h2>
              <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                {prodcut.prodcutDescription}
              </p>
              <div className="mt-5 flex items-center ">
                <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                  {`₹${prodcut.currentPrice}`}
                </div>
                <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                  {prodcut.priceBeforeDiscount > 0
                    ? `₹${prodcut.priceBeforeDiscount}`
                    : ""}
                </span>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-3  ">
              <div className="mb-4 ">
                <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                  color
                </h3>
                <ul className="colors -mr-3 flex flex-wrap">
                  {[prodcut.colour].map((color) => (
                    <li
                      key={color}
                      className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                    >
                      <span
                        className={`block h-full w-full rounded `}
                        style={{ backgroundColor: color }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-s-4 3xl:pr-48 flex flex-col items-center justify-between gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
              {error ? (
                <p className="text-red-500 font-sans text-base text-center font-bold">
                  Please log in first
                </p>
              ) : (
                <></>
              )}
              {success ? (
                <p className="text-green-500 font-sans text-base text-center font-bold">
                  Add to cart successful
                </p>
              ) : (
                <></>
              )}
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={handleCart}
              >
                Add to cart
              </button>
            </div>
            <div className="py-6 ">
              <ul className="space-y-5 pb-1 text-sm">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Fabric:
                  </span>
                  {prodcut.fabric}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
