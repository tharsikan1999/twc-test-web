import logo from "./assets/img/logo.png";
import contactIMG from "./assets/img/contacts portal.png";
import Ellipse from "./assets/img/auth-Ellipse.png";

function Login() {
  return (
    <main
      className="flex w-full items-center  justify-between flex-col-reverse sm:flex-row sm:min-h-screen"
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="w-full h-screen relative hidden lg:flex">
        <img
          src={Ellipse}
          alt=""
          className="w-3/5 h-screen absolute  z-20 left-0 "
        />
      </div>

      <div className="w-full bg-customGreen flex items-center lg:absolute left-0 z-50 justify-center flex-col py-16 md:py-0 px-4 sm:min-h-screen sm:px-5 lg:w-1/2">
        <div className="flex flex-col justify-evenly items-center w-full lg:items-start md:w-auto">
          <div className="w-[293px]">
            <h1 className="text-[50px] font-bold text-white">Hi there,</h1>
            <span className="text-[35px] font-normal text-white">
              Welcome to our contacts portal
            </span>
          </div>
          <form className="w-full mt-14">
            <input
              type="email"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px]  font-normal"
              placeholder="e-mail"
              required
            />
            <input
              type="password"
              className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal"
              placeholder="password"
              required
            />
          </form>

          <div className=" flex justify-between items-center md:flex-row flex-col mt-8">
            <div className="flex justify-center md:justify-start ">
              <button
                type="submit"
                className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 px-10 h-[48px] md:text-[25px] text-[23px] border-1 border-white rounded-[50px]"
              >
                login
              </button>
            </div>

            <div className="flex justify-start mt-6 md:mt-0">
              <div className="h-[40px] text-white ml-4 flex items-center">
                <p className="text-[20px] md:text-[25px]">
                  or{" "}
                  <span className="underline underline-offset-4 cursor-pointer">
                    Click here to Register
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-36 md:py-0  lg:absolute right-0  truncate flex justify-center relative items bg-back sm:min-h-screen sm:px-5 lg:w-1/2">
        <div
          className="h-screen w-52 absolute hidden lg:block bg-customGreen"
          style={{
            borderRadius: "0 100% 100% 0",
            left: "-100px",
          }}
        ></div>
        <div className="w-full flex flex-col lg:pl-10 justify-center items-center">
          <div>
            <img
              src={logo}
              alt="logo"
              className="h-[60px] w-[170px] cursor-pointer mb-14 md:mb-5"
            />
            <img src={contactIMG} alt="contact img" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
