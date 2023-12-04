import { IoMdHome } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  FaUser,
  FaUserEdit,
  FaAddressCard,
  FaAddressBook,
  FaShareAlt,
  FaLocationArrow,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
const HamburgerMenu = ({ hamBurgerState, setHamBurgerState }) => {
  return (
    <aside
      className={`w-4/5 bg-teal-600 ${
        hamBurgerState ? "absolute" : "hidden"
      } top-0 right-0 sm:w-3/5 md:hidden h-full border-l-4 border-slate-300`}
    >
      <div className="flex flex-col w-full  px-4 items-start my-5 h-full">
        <div className="flex  justify-between w-full items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <div className="flex justify-center items-center space-x-3">
            <IoMdHome />
            <Link href="/">Home</Link>
          </div>
          <button onClick={() => setHamBurgerState((data) => !data)}>
            <RxCross2 className="text-3xl font-bold " />
          </button>
        </div>

        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <FaUserEdit />
          <Link href="/">Admin Ed</Link>
        </div>
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <FaAddressCard />
          <Link href="/about">About Us</Link>
        </div>
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <FaAddressBook />
          <Link href="/contact">Contact Us</Link>
        </div>
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <FaShareAlt />
          <Link href="/contact">Share</Link>
        </div>
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <FaLocationArrow />
          <Link href="/contact">Location</Link>
        </div>
        <hr className="h-1 rounded-full bg-white w-full my-2" />
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <FaUser />
          <Link href="/myprofile">Profile</Link>
        </div>
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <IoLogOut />
          <Link href="/contact">Logout</Link>
        </div>
        <div className="flex space-x-3 justify-center items-center px-2 py-3   rounded-lg text-xl text-white font-sans font-semibold">
          <BiSupport />
          <Link href="/contact">Support</Link>
        </div>
        <hr className="h-1 rounded-full bg-white w-full my-2" />
        <div className="flex text-white justify-evenly items-center text-2xl font-semibold font-sans w-full">
          <h1>Social</h1>
          <MdEmail />
          <FaInstagram />
          <FaWhatsapp />
        </div>
      </div>
    </aside>
  );
};

export default HamburgerMenu;

//style={{ height: "90vh" }}
