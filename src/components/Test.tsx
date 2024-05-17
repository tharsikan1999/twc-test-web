import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("first");
    console.log(data);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(({ message }) => {
        toast.error(message);
      });
    }
  };

  return (
    <>
      <form>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal"
          placeholder="e-mail"
          required
        />

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="bg-white rounded-3xl mb-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen md:w-[477px] lg:text-[25px] text-[20px] font-normal"
          placeholder="password"
          required
        />

        <button
          type="submit"
          className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 px-10 h-[48px] md:text-[25px] text-[23px] border-1 border-white rounded-[50px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          login
        </button>
        <ToastContainer />
      </form>
    </>
  );
}

function App() {
  return (
    <div className="w-full bg-customGreen flex items-center lg:absolute left-0 z-50 justify-center flex-col py-16 md:py-0 px-4 sm:min-h-screen sm:px-5 lg:w-1/2">
      <div className="flex flex-col justify-evenly items-center w-full lg:items-start md:w-auto">
        <div className="w-[293px]">
          <h1 className="text-[50px] font-bold text-white">Hi there,</h1>
          <span className="text-[35px] font-normal text-white">
            Welcome to our contacts portal
          </span>
        </div>
        <LoginForm />
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
                <Link to="/register">
                  <span className="underline underline-offset-4 cursor-pointer">
                    Click here to Register
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
