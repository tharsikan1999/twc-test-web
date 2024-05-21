import logo from "../assets/img/logo.png";
import contactIMG from "../assets/img/contacts portal.png";
import Ellipse from "../assets/img/auth-Ellipse.png";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";

const schema = z.object({
  email: z.string().email().min(1).max(255),
  password: z
    .string()
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one numeric digit",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .min(8),
});

type FormFields = z.infer<typeof schema>;

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3333/auth/login", {
        email: data.email,
        password: data.password,
      });

      //user does not exist
      if (response.data === "User not found") {
        toast.error("User does not exist");
        return;
      }

      //incorrect password
      if (response.data === "Invalid password") {
        toast.error("Incorrect password");
        return;
      }

      //login successful
      if (response.status === 201) {
        //store token in local storage
        localStorage.setItem("jwt", response.data.accessToken);

        toast.success("Login successful");
        navigate("/contacts/new");

        // Set timeout to automatically logout after 1 hour
        setTimeout(() => {
          logout();
          toast.warn("Session expired. Please login again.");
        }, 3600 * 1000); // 1 hour
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwtExpiryTime");
    navigate("/login");
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-14">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`bg-white rounded-3xl ${
                errors.email ? "mb-5" : "mb-10"
              } focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal`}
              placeholder="e-mail"
            />
            {errors.email && (
              <div className="text-red-500 mb-5">{errors.email.message}</div>
            )}

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`bg-white rounded-3xl ${
                errors.email ? "mb-5" : "mb-10"
              } focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal`}
              placeholder="password"
            />
            {errors.password && (
              <div className="text-red-500 mb-5">{errors.password.message}</div>
            )}

            <div className=" flex justify-between items-center md:flex-row flex-col mt-8 ">
              <div className="flex justify-center md:justify-start">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 px-10 h-[48px] md:text-[25px] text-[23px] border-1 border-white rounded-[50px]"
                >
                  {isSubmitting ? "Loading..." : "login"}
                </button>
              </div>

              <div className="flex justify-start mt-6 md:mt-0">
                <div className="h-[40px] text-white ml-4 flex items-center">
                  <p className="text-[20px] md:text-[25px]">
                    or{" "}
                    <Link to="/register">
                      <span className="underline underline-offset-4 cursor-pointer">
                        Click here to Register
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
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
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-[60px] w-[170px] cursor-pointer mb-14 md:mb-5"
              />
            </Link>
            <img src={contactIMG} alt="contact img" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
