import logo from "../assets/img/Logo-white.png";
import contactIMG from "../assets/img/contacts portal white.png";
import logoutIMG from "../assets/img/bx_log-out-circle.png";
import Man from "../assets/img/man.png";
import Girl from "../assets/img/girl.png";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import Ellipse01 from "../assets/img/Ellipse 1.png";
import RightImg from "../assets/img/Right_back.png";
import LeftImg from "../assets/img/Left_back.png";

function Contacts() {
  return (
    <main
      className=" w-full min-h-screen flex flex-col lg:items-center lg:relative"
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="relative w-full h-screen flex ">
        <img
          src={Ellipse01}
          alt=""
          className="  w-full h-full object-cover z-10"
        />
        <div className="absolute left-0 bottom-0">
          <img src={LeftImg} alt="" className="" />
        </div>
        <div className="absolute right-0 top-0">
          <img src={RightImg} alt="" className="" />
        </div>

        <div className="flex space-x-3 items-center justify-center cursor-pointer lg:mt-14 w-full lg:w-auto absolute  lg:right-14 bottom-10 lg:bottom-14 z-50">
          <img
            src={logoutIMG}
            alt="logout IMG"
            className="md:w-[43px] md:h-[43px] h-8 w-8"
          />
          <p className="underline underline-offset-4 text-white font-normal text-[20px] md:text-[25px]">
            Logout
          </p>
        </div>

        <div className="absolute top-0 z-20 w-full flex justify-center max-h-screen min-h-screen  overflow-scroll">
          <div className="lg:w-3/4 w-[90%] ">
            {/* Header Section */}
            <div className="w-full flex flex-col items-center lg:items-start mt-[72px]">
              <div>
                <img
                  src={logo}
                  alt="Logo"
                  height={24.03}
                  width={72.94}
                  className="cursor-pointer mb-3"
                />
                <img
                  src={contactIMG}
                  alt="Contact img"
                  height={60.77}
                  width={136.76}
                  className=""
                />
              </div>
            </div>

            {/* Contacts Header and Add Button */}
            <div className="flex justify-between items-center lg:mt-14 sm:px-5">
              <h1 className="text-[30px] md:text-[50px] my-10 font-bold text-white text-left">
                Contacts
              </h1>
              <button
                type="button"
                className="text-white leading-4 bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white w-[150px] sm:w-[255px] h-[38px] md:h-[48px] rounded-full text-[14px] md:text-[25px] sm:text-[20px] font-normal"
              >
                Add New Contact
              </button>
            </div>

            {/* Contacts Table */}
            <div className="relative overflow-x-auto shadow-md bg-white rounded-[30px]">
              <table className="w-full text-sm text-left rtl:text-right overflow-scroll ">
                <thead className="text-customGreen font-bold md:text-[18px] text-[15px] uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Full Name
                    </th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Phone
                    </th>
                    <th scope="col" className="py-3 md:pt-6"></th>
                    <th scope="col" className="py-3 md:pt-6"></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contacts;
