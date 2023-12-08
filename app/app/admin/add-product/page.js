"use client";

import { useState } from "react";
import {
  createCoverImage,
  createProduct,
  createMultipleProductImages,
} from "@/app/appwrite/appwrite";
const AddProductForm = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [coverImage, setCoverImage] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0.0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0.0);
  const [fabric, setFabric] = useState("cotton");
  const [multipleImages, setMultipleImages] = useState([]);
  const [color, setColor] = useState("");
  const handleSubmit = () => {
    if (productName.length <= 5 || productName.length > 60) {
      setError(true);

      if (productName.length <= 5) {
        setErrorMessage("Product name should be greater than 5 characters");
      } else {
        setErrorMessage(
          "Product name should be less than or equal to 30 characters"
        );
      }
      return;
    }
    if (productDescription.length <= 30 || productDescription.length > 500) {
      setError(true);
      if (productDescription.length <= 30) {
        setErrorMessage(
          "The product description , should be greater then 30 charcter"
        );
      } else {
        setErrorMessage(
          "The product description , should be lesser then or equal to 300 chacter"
        );
      }
      return;
    }
    if (currentPrice < 100 || currentPrice > 20000) {
      setError(true);
      if (currentPrice < 100) {
        setErrorMessage(
          "Product price should be greater than or equal to ₹100 "
        );
      } else {
        setErrorMessage("Product price should be lesser than ₹20000  ");
      }
      return;
    }
    if (priceBeforeDiscount < 0 || priceBeforeDiscount > 20000) {
      setError(true);
      if (priceBeforeDiscount < 0) {
        setErrorMessage(
          "Discount price should be greater than or equal to ₹0 "
        );
      } else {
        setErrorMessage("Discount price should be lesser than ₹20000  ");
      }
      return;
    }
    handleAsyncMultipleImages();
    handleAsyncCoverImage();
    if (error) {
      return;
    }

    createProduct(
      productName,
      productDescription,
      currentPrice,
      priceBeforeDiscount,
      fabric,
      color,
      coverImage,
      multipleImages
    );
  };

  const handleAsyncMultipleImages = () => {
    const mi = multipleImages;
    for (let i of mi) {
      if (i == undefined) {
        setError(true);
        setErrorMessage("The product image should contain four images");
      }
    }
  };

  const handleAsyncCoverImage = () => {
    const coverI = coverImage;
    if (!coverI) {
      setError(true);
      setErrorMessage("Add the cover image of the product");
    }
  };

  const handleMultipleImages = (e) => {
    setMultipleImages([
      e.target.files[0],
      e.target.files[1],
      e.target.files[2],
      e.target.files[3],
    ]);
  };
  const coverImageHandler = (e) => {
    console.log("cover image ", e.target.files[0]);
    setCoverImage(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center bg-white py-12 px-4">
      <div className="space-y-12">
        {error ? (
          <div className="text-center text-2xl text-red-600 font-sans">
            {errorMessage}
          </div>
        ) : null}
        <ProductTextComponent
          productName={productName}
          setProductName={setProductName}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
        />
        <CoverImageComponent
          coverImage={coverImage}
          coverImageHandler={coverImageHandler}
        />
        <ProductPriceAndOtherDetailComponent
          currentPrice={currentPrice}
          setCurrentPrice={setCurrentPrice}
          fabric={fabric}
          setFabric={setFabric}
          priceBeforeDiscount={priceBeforeDiscount}
          setPriceBeforeDiscount={setPriceBeforeDiscount}
          color={color}
          setColor={setColor}
        />
        <MultipleImageComponent
          multipleImages={multipleImages}
          handleMultipleImages={handleMultipleImages}
        />

        <div className="flex justify-center">
          <button
            className="px-10 py-2 rounded-md bg-teal-600 text-white text-center text-lg font-sans"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

const CoverImageComponent = ({ coverImage, coverImageHandler }) => {
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Cover photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a Image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={coverImageHandler}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG up to 3MB
            </p>
          </div>
        </div>
      </div>
      <p className="text-center text-teal-600 font-sans my-7">
        {coverImage?.name}
      </p>
    </>
  );
};

const MultipleImageComponent = ({ multipleImages, handleMultipleImages }) => {
  return (
    <>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Product Images
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Its required to add four images to display the product well , select
          four image of .jpg or .png
        </p>
      </div>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload-four"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a Image</span>
              <input
                multiple
                id="file-upload-four"
                name="file-upload-four"
                type="file"
                className="sr-only"
                onChange={handleMultipleImages}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 3MB</p>
        </div>
      </div>
      {multipleImages.length > 0 && (
        <div className="mt-4">
          <p className="text-center text-lg font-sans font-bold underline text-teal-600">
            Selected Images:
          </p>
          <ul className="w-full flex flex-col space-y-3 font-sans  text-teal-600 items-center justify-start px-4">
            {multipleImages.map((file, index) => (
              <li key={index}>{file?.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const ProductTextComponent = ({
  productName,
  setProductName,
  productDescription,
  setProductDescription,
}) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Admin</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        {`Greetings! You've entered the Admin Dashboard. Any changes made here
            will be recorded in the database`}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="product-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="product-name"
                id="product-name"
                className="block flex-1 border-0 bg-transparent py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 font-sans sm:leading-6"
                placeholder=""
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="product-description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Description
          </label>
          <div className="mt-2">
            <textarea
              id="product-description"
              name="product-description"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4 "
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about the product.
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductPriceAndOtherDetailComponent = ({
  currentPrice,
  setCurrentPrice,
  fabric,
  setFabric,
  priceBeforeDiscount,
  setPriceBeforeDiscount,
  color,
  setColor,
}) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Price Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        The price should be in float value
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="current-price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Current Price
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="current-price"
              id="current-price"
              className="block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              value={currentPrice}
              onChange={(e) => {
                setCurrentPrice(e.target.value);
              }}
              style={{ paddingLeft: 8, paddingRight: 8 }}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="price-before-discount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price Before Discount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="price-before-discount"
              id="price-before-discount"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={priceBeforeDiscount}
              onChange={(e) => {
                setPriceBeforeDiscount(e.target.value);
              }}
              style={{ paddingLeft: 8, paddingRight: 8 }}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="fabric"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Fabric
          </label>
          <div className="mt-2">
            <select
              id="fabric"
              name="fabric"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={fabric}
              onChange={(e) => {
                setFabric(e.target.value);
              }}
            >
              <option value="cotton">Cotton</option>
              <option value="linen">Linen</option>
              <option value="silk">Silk</option>
              <option value="wool">Wool</option>
              <option value="polyester">Polyester</option>
              <option value="rayon">Rayon</option>
              <option value="denim">Denim</option>
              <option value="velvet">Velvet</option>
              <option value="chiffon">Chiffon</option>
            </select>
          </div>

          <div className="mt-2">
            <select
              id="colour"
              name="colour"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            >
              <option value="">Select Saree Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="pink">Pink</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
