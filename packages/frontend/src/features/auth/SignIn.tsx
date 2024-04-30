/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from "formik";
import { useState } from "react";
import { loginSchema } from "./validation";
import loginImage from "../../assets/images/SvG/Computer login-rafiki.svg";
import { SinginData } from "./authInterface";
import FormInput from "./Components/FormInput";

const initialValues: SinginData = {
  userId: "",
  password: "",
};

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
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
          <span className="absolute bottom-0 left-0 w-full lg:w-[60%] h-[100%] bg-purple-gradient" />
          <div className="container z-10">
            <div className="flex flex-wrap items-center justify-center w-full h-full">
              <div className="h-[40rem] w-[70rem] flex bg-black rounded-lg ">
                <div className="h-full w-[54%] hidden lg:flex bg-[#8260ca] bg-pink-gradient rounded-l-lg items-center justify-center">
                  <img src={loginImage} alt="Login" className="w-[95%]" />
                </div>
                <div className="h-full w-full lg:w-[46%] rounded-lg lg:rounded-r-lg bg-[#1c1d21] p-14 flex items-center justify-center ">
                  <div className="flex flex-col h-full">
                    <div className="mb-10">
                      <h4 className="h4">
                        Sign in to <span className="font-bold text-transparent bg-clip-text bg-pink-gradient">STM</span>
                      </h4>
                      <p className="text-xs">Enter your account details</p>
                    </div>
                    <div className="flex-auto">
                      <form onSubmit={handleSubmit} className="max-w-screen-lg mb-2 w-80 sm:w-96">
                        <div className="flex flex-col gap-5 ">
                          <FormInput
                            value={values.userId}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            tagName="User ID"
                            name="userId"
                            type="text"
                            error={errors.userId}
                          />
                          <FormInput
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            tagName="Password"
                            name="password"
                            type="password"
                            error={errors.password}
                          />
                        </div>
                        <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 text-start">
                          <a
                            className="text-xs font-semibold text-pink-500 transition-colors hover:text-blue-700"
                            href="./"
                          >
                            Forget your password
                          </a>
                        </p>
                        <button
                          className="mt-16 block w-full h-14 select-none rounded-lg bg-[#e7469b] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-400/20 transition-all hover:shadow-lg hover:shadow-[#e7469b66] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="submit"
                          data-ripple-light="true"
                          disabled={formik.isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Sign In"}
                        </button>
                        <p className="block mt-4 font-sans text-xs text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                          Don't have an account?
                          <a
                            className="ml-1 font-semibold text-pink-500 transition-colors hover:text-blue-700"
                            href="./signup"
                          >
                            Sign Up Now!
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
export default SignIn;
