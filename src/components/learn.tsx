import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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

const Learn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}

      <input {...register("name")} type="text" placeholder="Name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}

      {/* Gender Input */}
      <div>
        <label htmlFor="male" className="mr-2">
          Male
          <input
            id="male"
            {...register("gender", { required: "Gender is required" })}
            type="radio"
            value="male"
            name="gender"
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            id="female"
            {...register("gender", { required: "Gender is required" })}
            type="radio"
            value="female"
            name="gender"
          />
        </label>
      </div>
      {errors.gender && (
        <div className="text-red-500">{errors.gender.message}</div>
      )}

      <input {...register("phone")} type="text" placeholder="Phone" />
      {errors.phone && (
        <div className="text-red-500">{errors.phone.message}</div>
      )}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default Learn;
