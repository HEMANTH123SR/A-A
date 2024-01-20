"use client";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  getCartDetails,
  getAccountDetails,
  removeChart,
} from "@/app/appwrite/appwrite";
import Script from "next/script";
const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notSignIn, setNotSignedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(9009);
  const [userInfo, setUserInfo] = useState({});
  // const [chartDetails, setChartDetails] = useState([]);
  useEffect(() => {
    const asyncFunc = async () => {
      const userInfo = await getAccountDetails();
      setUserInfo(userInfo);
      setIsLoading(true);
      if (userInfo?.$id) {
        const res = await getCartDetails(userInfo?.$id);

        const filtredData = res.documents.map((data) => {
          return {
            id: data.$id,
            name: data.name,
            href: "#",
            originalPrice: data.currentPrice,
            color: data.colour,
            imageSrc: data.coverImage,
          };
        });

        setProducts(filtredData);
        console.log("product", res);
        console.log("filtred data", filtredData);
        return;
      }
      setNotSignedIn(true);
    };
    asyncFunc();
  }, [reload]);

  const removeProductFromChart = async (id) => {
    await removeChart(id);
    setReload(Math.random());
  };

  const iniatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = { cart: products, subTotal: productPrice(), oid ,email:userInfo?.email};
    let a = await fetch(`http://localhost:3000/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txn_Token = await a.json();
    console.log(b);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txn_Token /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: productPrice() /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  const productPrice = () => {
    let price = 0;
    products.map((data) => {
      price += data?.originalPrice;
    });
    return price;
  };
  if (!isLoading) {
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
  if (notSignIn) {
    return (
      <div
        className="bg-white flex justify-center items-center"
        style={{ height: "90vh" }}
      >
        <h1 className="text-red-500 font-sans text-xl">
          Kindly log in before proceeding
        </h1>
      </div>
    );
  }
  return (
    <div className="bg-white">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_Host}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        // onload="onScriptLoad();"
        crossorigin="anonymous"
      />

      <div className="mx-auto max-w-7xl px-2 lg:px-0 bg-white xl:px-10">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product) => (
                  <div key={product.id} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          // className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          className="h-[60px] w-[60px] object-cover transition duration-500 group-hover:scale-105 "
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-semibold text-black"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                            <div className="mt-1 flex items-center space-x-4">
                              <p className="text-xs font-medium text-black ">
                                {`₹ ${product.originalPrice}`}
                              </p>
                              <button
                                type="button"
                                className="flex items-center space-x-1 px-2 py-1 pl-0"
                              >
                                <Trash size={12} className="text-red-500" />
                                <span
                                  className="text-xs font-medium text-red-500"
                                  onClick={() => {
                                    removeProductFromChart(product.id);
                                  }}
                                >
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex"></div>
                  </div>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({products.length} item)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {`₹ ${productPrice()}`}
                    </dd>
                  </div>
                  {/* <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      - ₹ 3,431
                    </dd>
                  </div> */}
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {`₹ ${productPrice()}`}
                    </dd>
                  </div>
                </dl>
              </div>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={iniatePayment}
              >
                Place order
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
