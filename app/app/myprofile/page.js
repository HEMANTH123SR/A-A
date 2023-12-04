"use client";
import { getAccountDetails, deleteSession } from "@/app/appwrite/appwrite";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";

const UserProfile = () => {
  const router = useRouter();
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    prefs: {
      location: "",
    },
  });

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
  const OrderedProductDetails = [
    {
      orderId: "7897d",
      orderStatus: "In Progress",
      orderImg:
        "https://t4.ftcdn.net/jpg/00/17/49/37/360_F_17493746_NxmDWBzvxFZjwi2lmDXVddPTI4nlb44p.jpg",
    },
    {
      orderId: "7f97d",
      orderStatus: "Delivered",
      orderImg:
        "https://t4.ftcdn.net/jpg/00/17/49/37/360_F_17493746_NxmDWBzvxFZjwi2lmDXVddPTI4nlb44p.jpg",
    },
    {
      orderId: "9097d",
      orderStatus: "Cancelled",
      orderImg:
        "https://t4.ftcdn.net/jpg/00/17/49/37/360_F_17493746_NxmDWBzvxFZjwi2lmDXVddPTI4nlb44p.jpg",
    },
    {
      orderId: "dh765",
      orderStatus: "Cancelled",
      orderImg:
        "https://t4.ftcdn.net/jpg/00/17/49/37/360_F_17493746_NxmDWBzvxFZjwi2lmDXVddPTI4nlb44p.jpg",
    },
    {
      orderId: "7oo7d",
      orderStatus: "Delivered",
      orderImg:
        "https://t4.ftcdn.net/jpg/00/17/49/37/360_F_17493746_NxmDWBzvxFZjwi2lmDXVddPTI4nlb44p.jpg",
    },
  ];

  return (
    <div className="w-full flex flex-col ">
      <div
        className="w-full px-4 sm:px-12 bg-teal-600  flex justify-center items-center"
        style={{ height: "25vh" }}
      >
        <div className="flex flex-col space-y-4 w-3/5 md:w-1/2">
          {accountDetails.name ? (
            <h1 className="text-3xl text-white font-semibold font-sans">
              {accountDetails.name}
            </h1>
          ) : (
            <h1>Guest User</h1>
          )}
          {accountDetails.prefs.location ? (
            <h1 className="text-lg text-white font-semibold font-sans">
              {accountDetails.prefs.location}
            </h1>
          ) : (
            <h2  className="text-lg text-white font-semibold font-sans">India, Bengaluru</h2>
          )}
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
          <div className="flex flex-col justify-center items-center w-full space-y-4 mb-12">
            {OrderedProductDetails ? (
              OrderedProductDetails.map((data) => {
                return (
                  <div
                    key={data.orderId}
                    className="w-full border-2 border-teal-600 h-20  flex  rounded-md "
                  >
                    <div className="flex flex-col justify-center items-center w-1/3">
                      <p className="text-xs lg:text-lg font-semibold font-sans">
                        Order {data.orderId}
                      </p>
                      {/* <p className="text-sm">VIEW ORDER</p> */}
                    </div>
                    <div className="flex justify-center items-center w-1/3">
                      <Status statusMessage={data.orderStatus} />
                    </div>
                    <div className="flex justify-center items-center w-1/3">
                      <img
                        src={data.orderImg}
                        width={"80"}
                        height={"80"}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Status = ({ statusMessage }) => {
  if (statusMessage == "Cancelled") {
    return (
      <div className="flex space-x-2 justify-center items-center text-sm">
        <FaCircle className="text-red-600" />
        <p>{statusMessage}</p>
      </div>
    );
  }
  if (statusMessage == "In Progress") {
    return (
      <div className="flex space-x-2 justify-center items-center text-sm">
        <FaCircle className="text-orange-600" />
        <p>{statusMessage}</p>
      </div>
    );
  }
  return (
    <div className="flex space-x-2 justify-center items-center text-sm">
      <FaCircle className="text-green-600" />
      <p>{statusMessage}</p>
    </div>
  );
};

export default UserProfile;
