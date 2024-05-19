import logo from "../assets/img/Logo-white.png";
import contactIMG from "../assets/img/contacts portal white.png";
import logoutIMG from "../assets/img/bx_log-out-circle.png";
import Ellipse01 from "../assets/img/Ellipse 1.png";
import RightImg from "../assets/img/Right_back.png";
import LeftImage from "../assets/img/Left_back.png";
import { Link, useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const goToPage = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      navigate("/contacts"); // Replace with your dashboard path
    } else {
      navigate("/login");
    }
  };
  return (
    <main
      className="w-full min-h-screen flex flex-col lg:items-center lg:relative "
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="relative w-full h-screen flex ">
        <img
          src={Ellipse01}
          alt=""
          className="  w-full h-full object-cover z-10"
        />
        <div className="absolute left-0 bottom-0">
          <img src={LeftImage} alt="" className="" />
        </div>
        <div className="absolute right-0 top-0">
          <img src={RightImg} alt="" className="" />
        </div>
        <div className="absolute top-0 z-20 w-full min-h-screen flex justify-center">
          <div className="my-5 lg:w-3/4 w-full mt-[72px]  ">
            <div className="w-full flex flex-col items-center lg:items-start">
              <div>
                <img
                  src={logo}
                  alt="logo"
                  className="h-[24.03px] w-[72.94px] cursor-pointer mb-3"
                />
                <Link to="/">
                  <img
                    src={contactIMG}
                    alt="logo"
                    className="w-[136.76px] h-[60.77px]"
                  />
                </Link>
              </div>
            </div>
            <h1 className="text-[40px] md:text-[50px] lg:mt-32 font-bold text-white text-center mt-28 lg:text-left">
              Welcome,
            </h1>
            <p className=" text-white lg:text-[35px] text-[20px] text-center mt-5 lg:text-left xl:w-3/4">
              This is where your contacts will live. Click the button below{" "}
              <br className=" hidden" /> to add a new contact.
            </p>
            <form action="" className="w-full mt-32 lg:mt-20 px-6  lg:px-0 ">
              <div className=" flex justify-center mt-10 lg:justify-start lg:mt-20 ">
                <button
                  type="button"
                  onClick={goToPage}
                  className="text-white bg-customGreen border-2 focus:outline-none  focus:ring-gray-300  border-white px-2  md:w-[323px] w-[280px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] font-normal"
                >
                  add your first contact
                </button>
              </div>
            </form>
            <div className="flex space-x-3 items-center justify-center cursor-pointer lg:mt-14 w-full lg:w-auto absolute  lg:right-14 bottom-10 lg:bottom-14">
              <img
                src={logoutIMG}
                alt="logout IMG"
                className="md:w-[43px] md:h-[43px] h-8 w-8"
              />
              <p className="underline underline-offset-4 text-white font-normal text-[20px] md:text-[25px]">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Welcome;
