"use client";
import { getAccountDetails, deleteSession } from "@/app/appwrite/appwrite";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import TestImg from "@/public/dp-0.jpg";
const UserProfile = () => {
  const router = useRouter();
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setAccountDetails(await getAccountDetails());
    };
    fetchDetails();
  }, []);

  const handleDeleteSession = async () => {
    await deleteSession();
    router.push("/");
  };

  if (!accountDetails) {
    return (
      <div
        className="flex  w-full items-center justify-center bg-white"
        style={{ height: "80vh" }}
      >
        <h1 className="font-sans text-3xl text-teal-600 font-bold">
          {"You haven't signed in"}
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col ">
      <div
        className="w-full px-4 sm:px-12 bg-teal-600  flex justify-center items-center"
        style={{ height: "25vh" }}
      >
        <div className="flex flex-col space-y-4 w-3/5 md:w-1/2">
          <h1 className="text-3xl text-white font-semibold font-sans">
            {accountDetails.name}
          </h1>
          <h1 className="text-lg text-white font-semibold font-sans">
            Banglore India
          </h1>
        </div>
        <div className="flex w-2/5 md:w-1/2 justify-end">
          {accountDetails ? (
            <div className="flex ">
              <button
                className=" flex justify-center items-center s rounded-md bg-white px-4 py-2.5 text-sm font-medium  text-teal-600 transition "
                onClick={handleDeleteSession}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="w-full  bg-white flex flex-col lg:items-center">
        <div className="mx-2  lg:w-3/4 md:mx-0 text-teal-600 ">
          <div className="flex flex-col my-8">
            <h3 className="text-3xl font-sans font-semibold">Orders</h3>
            <p className="font-sans">8 Items</p>
          </div>
          <div className="flex items-center sm:space-x-11 md:space-x-20 my-6">
            <Image
              src={TestImg}
              width={60}
              height={60}
              alt=""
              className="rounded-md"
            />
            <div className="flex flex-col justify-center ">
              <div>
                <p className="font-sans text-teal-600 text-lg font-semibold">
                  Artistic Patola Silk Saree
                </p>
              </div>
              <div>
                <p className="font-sans text-teal-600  ">order : successful</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
