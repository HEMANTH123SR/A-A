import React, { useState, useEffect } from "react";
import { getProducts } from "@/app/appwrite/appwrite";
import Link from "next/link";

const ProductCollection = () => {
  const [products, setProducts] = useState({});
  const [fabrics, setFabrics] = useState({
    cotton: true,
    linen: true,
    silk: true,
    wool: true,
    polyester: true,
    rayon: true,
    denim: true,
    velvet: true,
    chiffon: true,
    banarasi: true,
    satin: true,
  });
  const [color, setColor] = useState({
    red: true,
    blue: true,
    green: true,
    yellow: true,
    pink: true,
    purple: true,
    orange: true,
  });

  const [minPriceRange, setMinPriceRange] = useState(300);
  const [maxPriceRange, setMaxPriceRange] = useState(20000);
  const [selecetdFabricInNumbers, setSelecetdFabricInNumbers] = useState(0);
  const [selecetdColorInNumbers, setSelecetdColorInNumbers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
    const fabricArray = Object.keys(fabrics).filter(
      (fabric) => fabrics[fabric]
    );
    const colorArray = Object.keys(color).filter(
      (colorName) => color[colorName]
    );

    const fetchProducts = async () => {
      const response = await getProducts(
        colorArray,
        fabricArray,
        minPriceRange,
        maxPriceRange
      );
      setProducts(response);
      setIsLoading(true);
    };

    fetchProducts();
  }, [
    selecetdColorInNumbers,
    selecetdFabricInNumbers,
    minPriceRange,
    maxPriceRange,
  ]);

  useEffect(() => {
    let counter = 0;
    for (let i of Object.values(color)) {
      if (i) {
        counter++;
      }
    }
    setSelecetdColorInNumbers(counter);
  }, [color]);
  useEffect(() => {
    let counter = 0;
    for (let i of Object.values(fabrics)) {
      if (i) {
        counter++;
      }
    }
    setSelecetdFabricInNumbers(counter);
  }, [fabrics]);

  const resetFabrics = () => {
    setFabrics({
      cotton: true,
      linen: true,
      silk: true,
      wool: true,
      polyester: true,
      rayon: true,
      denim: true,
      velvet: true,
      chiffon: true,
      banarasi: true,
      satin: true,
    });
  };

  const resetColors = () => {
    setColor({
      red: true,
      blue: true,
      green: true,
      yellow: true,
      pink: true,
      purple: true,
      orange: true,
    });
  };
  const resetPriceRange = () => {
    setMinPriceRange(300);
    setMaxPriceRange(20000);
  };
  if (!isLoading) {
    return (
      <div
        className="bg-white flex justify-center items-center"
        style={{ height: "90vh" }}
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
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        {/* <div className="mt-8 block lg:hidden">
          <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div> */}

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="p-4 space-y-4 lg:block">
            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>

              <div className="mt-1 space-y-2">
                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> Fabric </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {" "}
                        {selecetdFabricInNumbers} Selected{" "}
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetFabrics}
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        <label
                          htmlFor="cotton"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="cotton"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.cotton}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, cotton: !prev.cotton };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Cotton{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="linen"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="linen"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.linen}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, linen: !prev.linen };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Linen{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="silk"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="silk"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.silk}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, silk: !prev.silk };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            silk{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="wool"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="wool"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.wool}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, wool: !prev.wool };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Wool{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="polyester"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="polyester"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.polyester}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, polyester: !prev.polyester };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Polyester{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="denim"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="denim"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.denim}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, denim: !prev.denim };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Denim{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="velvet"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="velvet"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.velvet}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, velvet: !prev.velvet };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Velvet{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="chiffon"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="chiffon"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.chiffon}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, chiffon: !prev.chiffon };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Chiffon{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="banarasi"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="banarasi"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.banarasi}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, banarasi: !prev.banarasi };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Banarasi{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="satin"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="satin"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.satin}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, satin: !prev.satin };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Satin{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="rayon"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="rayon"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={fabrics.rayon}
                            onClick={() => {
                              setFabrics((prev) => {
                                return { ...prev, rayon: !prev.rayon };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            rayon{" "}
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> Price </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {" "}
                        The highest price is ₹20000{" "}
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetPriceRange}
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between gap-4">
                        <label
                          htmlFor="FilterPriceFrom"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">₹</span>

                          <input
                            type="number"
                            id="FilterPriceFrom"
                            placeholder="From"
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            value={minPriceRange}
                            onChange={(e) => {
                              setMinPriceRange(e.target.value);
                            }}
                          />
                        </label>

                        <label
                          htmlFor="FilterPriceTo"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">₹</span>

                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="To"
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            value={maxPriceRange}
                            onChange={(e) => {
                              setMaxPriceRange(e.target.value);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </details>

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                    <span className="text-sm font-medium"> Colors </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {" "}
                        {selecetdColorInNumbers} Selected{" "}
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetColors}
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        <label
                          htmlFor="FilterRed"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterRed"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.red}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, red: !prev.red };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Red{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterBlue"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterBlue"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.blue}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, blue: !prev.blue };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Blue{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterGreen"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterGreen"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.green}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, green: !prev.green };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Green{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterOrange"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterOrange"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.orange}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, orange: !prev.orange };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Orange{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterPurple"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterPurple"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.purple}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, purple: !prev.purple };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Purple{" "}
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterPink"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterPink"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.pink}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, pink: !prev.pink };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Pink{" "}
                          </span>
                        </label>
                      </li>
                      <li>
                        <label
                          htmlFor="FilterYellow"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterYellow"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={color.yellow}
                            onClick={() => {
                              setColor((prev) => {
                                return { ...prev, yellow: !prev.yellow };
                              });
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {" "}
                            Yellow{" "}
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products ? (
                products?.documents?.map((data) => {
                  return (
                    <li key={data.$id}>
                      <Link
                        href={`/product/${data.$id}`}
                        className="group block overflow-hidden"
                      >
                        <img
                          src={data.coverImages}
                          alt=""
                          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        />

                        <div className="relative bg-white pt-3">
                          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {data.name}
                          </h3>

                          <p className="mt-2">
                            <span className="sr-only"> Regular Price </span>

                            <span className="tracking-wider text-gray-900">
                              {" "}
                              {`₹ ${data.currentPrice}`}{" "}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollection;
