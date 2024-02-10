"use client";
import React, { useState, useEffect, useRef } from "react";
import { getSearchProducts } from "@/app/appwrite/appwrite";
const SearchPage = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    (async () => {
      if (search.trim() === "") {
        return;
      }
      const data = await getSearchProducts(search);
      console.log(data.documents);
      setProducts(data.documents);
    })();
  }, [search]);
  return (
    <div className="flex flex-col space-y-1 w-full justify-center items-center pt-6 h-full bg-white  ">
      <input
        className="w-10/12 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-sans custom-placeholder no-border"
        ref={inputRef}
        type="text"
        aria-label="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ color: "black" }}
      />
      <div className="w-10/12 h-0.5 bg-[#0D9488] "></div>
      <div className="min-h-4"></div>
      <div className="w-10/12 min-h-[70vh] flex flex-col gap-4">
        {products?.map((product) => (
          <div
            key={product.$id}
            className="flex items-center gap-4 cursor-pointer"
            // onClick={() => router.push(`/manga/${manga._id}`)}
          >
            <img
              alt={`${product.name} image`}
              className="h-[100px] w-[80px] object-cover rounded-lg"
              src={product.coverImages}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
            />
            {console.log(product.coverImages)}
            <div className="flex flex-col justify-start items-start">
              <span className="text-base font-sans font-bold line-clamp-1 break-all">{`${product.name}`}</span>
              <span className="font-sans text-sm">{`${product.fabric}`}</span>
              <span className="text-xs text-gray-500 font-mono ">
                {` ₹${product.currentPrice}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
