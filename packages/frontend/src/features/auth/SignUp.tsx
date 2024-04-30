/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from "formik";
import { useState } from "react";
import signUpSvg from "../../assets/images/SvG/Sign up-amico.svg";
import { SignupData } from "./authInterface";
import { registrationSchema } from "./validation";
import FormInput from "./Components/FormInput";

const initialValues: SignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        console.log("Submitting registration:", values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  return (
    <main data-theme="dark" className="w-screen mt-0 transition-all duration-200 ease-soft-in-out bg-[#000]">
      <section className="h-screen min-h-screen">
        <div className="relative flex w-full h-full">
          <span className="absolute top-0 right-0 w-full lg:w-[60%] h-[100%] bg-blueover-gradient" />
          {/* <span className="w-full h-full bg-black-gradient" /> */}
          <span className="absolute bottom-0 left-0 w-[60%] h-[100%] bg-purple-gradient" />
          <div className="container z-10">
            <div className="flex flex-wrap items-center justify-center w-full h-full">
              <div className="h-[40rem] w-[70rem] flex bg-black rounded-lg">
                <div className="h-full w-[54%] hidden lg:flex bg-[#8260ca] bg-pink-gradient rounded-l-lg items-center justify-center">
                  <img src={signUpSvg} alt="Login" className="w-[90%]" />
                </div>
                <div className="h-full w-full lg:w-[46%] rounded-lg lg:rounded-r-lg bg-[#1c1d21] px-14 py-7 flex items-center justify-center ">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h4 className="h4">
                        Sign Up <span className="font-bold text-transparent bg-clip-text bg-pink-gradient">STM</span>
                      </h4>
                      <p className="text-xs">Enter your new Account details</p>
                    </div>
                    <div className="flex-auto">
                      <form onSubmit={handleSubmit} className="max-w-screen-lg mb-2 w-80 sm:w-96">
                        <div className="flex flex-col gap-5">
                          <FormInput
                            name="firstName"
                            tagName="First Name"
                            error={errors.firstName}
                            type="text"
                            value={values.firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormInput
                            name="lastName"
                            tagName="Last Name"
                            error={errors.lastName}
                            type="text"
                            value={values.lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormInput
                            name="email"
                            tagName="Email"
                            error={errors.email}
                            type="text"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormInput
                            name="password"
                            tagName="Password"
                            error={errors.password}
                            type="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormInput
                            name="confirmPassword"
                            tagName="Confirm Password"
                            error={errors.confirmPassword}
                            type="password"
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                        <button
                          className="mt-7 block w-full h-12 select-none rounded-lg bg-[#e7469b] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-400/20 transition-all hover:shadow-lg hover:shadow-[#e7469b66] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="submit"
                          data-ripple-light="true"
                        >
                          {isSubmitting ? "Submitting..." : "Sign up"}
                        </button>
                        <p className="block mt-4 font-sans text-xs text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                          Already have an account?
                          <a
                            className="ml-1 font-semibold text-pink-500 transition-colors hover:text-blue-700"
                            href="/signin"
                          >
                            Sign In Now!
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default SignUp;
