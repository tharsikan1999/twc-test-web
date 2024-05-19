import logo from "../assets/img/logo.png";
import contactIMG from "../assets/img/contacts portal.png";
import Ellipse from "../assets/img/auth-Ellipse.png";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";

const schema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

function Register() {
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
      const response = await axios.post("http://localhost:3333/auth/register", {
        email: data.email,
        password: data.password,
      });

      //email is already registered
      if (response.data === "Email already exists") {
        toast.error("Email is already registered");
        return;
      }

      // Handle successful registration
      if (response.status === 201) {
        toast.success("Registration successful");
        // Redirect to welcome page
        navigate("/login");
      }
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };

  return (
    <main
      className="flex w-full items-center justify-between flex-col-reverse sm:flex-row sm:min-h-screen"
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="w-full h-screen relative hidden lg:flex">
        <img
          src={Ellipse}
          alt=""
          className="w-3/5 h-screen absolute  z-20 left-0 "
        />
      </div>

      {/* Registration form */}
      <div className="w-full flex items-center lg:absolute left-0 z-50 bg-customGreen justify-center flex-col py-16 md:py-0 px-4 sm:min-h-screen sm:px-5 lg:w-1/2">
        <div className="flex flex-col justify-evenly items-center w-full md:items-start md:w-auto">
          {/* Form Title */}
          <h1 className="sm:text-[50px] text-[35px] font-bold text-white md:text-left  text-center">
            Register Now!
          </h1>

          {/* Registration Form */}
          <form className="w-full mt-14" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <input
              {...register("email")}
              type="email"
              name="email"
              className={`bg-white rounded-3xl ${
                errors.email ? "mb-5" : "mb-10"
              } focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal`}
              placeholder="e-mail"
            />
            {errors.email && (
              <div className="text-red-500 mb-5">{errors.email.message}</div>
            )}

            {/* Password Input */}
            <input
              {...register("password")}
              type="password"
              name="password"
              className={`bg-white rounded-3xl ${
                errors.email ? "mb-5" : "mb-10"
              } focus:ring-blue-500 focus:border-blue-500 block h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal`}
              placeholder="create password"
            />
            {errors.password && (
              <div className="text-red-500 mb-5">{errors.password.message}</div>
            )}

            {/* Confirm Password Input */}
            <input
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              className={`bg-white rounded-3xl ${
                errors.email ? "mb-5" : "mb-10"
              } focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal`}
              placeholder="confirm password"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 mb-5">
                {errors.confirmPassword.message}
              </div>
            )}

            {/* Register Button */}
            <div className="flex justify-center md:justify-start">
              <button
                disabled={isSubmitting}
                type="submit"
                className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 w-[149px]   h-[48px] md:text-[25px] text-[23px] border-1 border-white rounded-[50px] lg:mt-8 mt-4"
              >
                {isSubmitting ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
          {/* Link to login */}
          <div className="h-[40px] text-white flex  items-center mt-10 lg:mt-20">
            <Link to="/login">
              <p className="text-[20px] md:text-[25px] underline underline-offset-4 cursor-pointer">
                &lt; Back to login
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Logo and contact imgs */}
      <div className="w-full py-36 md:py-0 truncate flex lg:absolute right-0 justify-center bg-back md:pr-5 lg:pr-0 items sm:min-h-screen pl-10 lg:pl-0 lg:w-1/2">
        <div className="w-full flex flex-col lg:pl-10 justify-center items-center  ">
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

export default Register;
