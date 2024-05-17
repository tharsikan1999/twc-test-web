import logo from "../assets/img/Logo-white.png";
import contactIMG from "../assets/img/contacts portal white.png";
import logoutIMG from "../assets/img/bx_log-out-circle.png";
import Ellipse01 from "../assets/img/Ellipse 1.png";
import RightImg from "../assets/img/Right_back.png";
import LeftImg from "../assets/img/Left_back.png";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

enum Gender {
  Male = "male",
  Female = "female",
}

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(255),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name must be less than 255 characters" }),
  gender: z.nativeEnum(Gender, {
    errorMap: (issue) => {
      switch (issue.code) {
        default:
          return { message: "gender is required" };
      }
    },
  }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(20, { message: "Phone number must be less than 20 characters" }),
});

type FormFields = z.infer<typeof schema>;

function AddContact() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      toast.success("Contact added successfully");
      console.log(data);
      navigate("/contacts");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
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
          <img src={LeftImg} alt="" className="" />
        </div>
        <div className="absolute right-0 top-0">
          <img src={RightImg} alt="" className="" />
        </div>
        <div className="absolute top-0 z-20 w-full min-h-screen flex justify-center">
          <div className="my-5 lg:w-3/4 mt-[72px]">
            <div className="w-full flex flex-col items-center lg:items-start">
              <div>
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    className="h-[24.03px] w-[72.94px] cursor-pointer mb-3"
                  />
                </Link>
                <img
                  src={contactIMG}
                  alt="logo"
                  className="w-[136.76px] h-[60.77px]"
                />
              </div>
            </div>
            <h1 className="text-[40px] md:text-[50px] lg:mt-24 font-bold text-white text-center mt-5 lg:text-left">
              New Contact
            </h1>
            <form
              className="w-full mt-10 lg:mt-16 px-6 lg:px-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-center lg:flex-row lg:space-x-10 lg:justify-between lg:w-3/4">
                <div className="  mb-10">
                  <input
                    {...register("name")}
                    type="text"
                    name="name"
                    className="bg-white rounded-3xl  focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-[25px] h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <div className="text-red-500 ml-5 mt-5 text-xl">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="  mb-10">
                  <input
                    type="email"
                    className="bg-white rounded-3xl  focus:ring-blue-500 focus:border-blue-500 block h-[55px] pl-[41px] lg:text-[25px] dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="text-red-500 ml-5 mt-5 text-xl">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center lg:flex-row lg:space-x-10 lg:justify-between lg:w-3/4">
                <div className="  mb-10">
                  <input
                    type="text"
                    className="bg-white rounded-3xl  focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-[25px] h-[55px] pl-[41px] dark:focus:ring-blue-500 dark:focus:border-blue-500 text-customGreen placeholder-customGreen sm:w-3/4 md:w-[477px]"
                    placeholder="Phone number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <div className="text-red-500 ml-5 mt-5 text-xl">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                <div className="  mb-10">
                  <div className="flex items-center space-x-3 lg:w-[477px] lg:justify-between lg:pl-2">
                    <p className="text-[20px] lg:text-[25px] text-white font-normal">
                      Gender
                    </p>
                    <label
                      htmlFor="male"
                      className="text-[20px] lg:text-[25px] text-white font-normal flex items-center"
                    >
                      Male
                      <input
                        id="male"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        type="radio"
                        value="male"
                        name="gender"
                        className="w-4 h-4 ml-10 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </label>
                    <label
                      htmlFor="female"
                      className="text-[20px] lg:text-[25px] text-white font-normal flex items-center"
                    >
                      Female
                      <input
                        id="female"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        type="radio"
                        value="female"
                        name="gender"
                        className="w-4 h-4 ml-10 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </label>
                  </div>

                  {errors.gender && (
                    <div className="text-red-500 ml-5 mt-5 text-xl">
                      {errors.gender.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-10 lg:justify-start 2xl:mt-16">
                <button
                  type="submit"
                  className="text-white bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white px-5 md:w-[323px] h-[38px] md:h-[48px] rounded-full text-[20px] md:text-[25px] sm:text-[16px] font-normal"
                >
                  Add your first contact
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex space-x-3 items-center justify-center cursor-pointer lg:mt-14 w-full lg:w-auto absolute  lg:right-14  lg:bottom-14  z-50 bottom-10">
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
    </main>
  );
}

export default AddContact;
