import React from "react";
import { FormikErrors } from "formik";
import Button from "./Button";
import FormInput from "./FormInput";
import { LoginData } from "../authInterface";

type Props = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleBlur: (e: React.FocusEvent<unknown, Element>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  errors: FormikErrors<LoginData>;
  values: LoginData;
  isSubmitting: boolean;
};

function LoginForm({ handleSubmit, handleBlur, handleChange, errors, values, isSubmitting }: Props) {
  return (
    <div className="h-full w-full lg:w-[46%] rounded-lg lg:rounded-r-lg bg-[#1c1d21] p-14 flex items-center justify-center">
      <div className="flex flex-col h-full">
        <div className="mb-10">
          <h4 className="h4">
            Login to <span className="font-bold text-transparent bg-clip-text bg-pink-gradient">STM</span>
          </h4>
          <p className="text-xs">Enter your account details</p>
        </div>
        <div className="flex-auto">
          <form onSubmit={handleSubmit} className="max-w-screen-lg mb-2 w-80 sm:w-96">
            <div className="flex flex-col gap-5">
              <FormInput
                value={values.userId}
                onBlur={handleBlur}
                onChange={handleChange}
                tagName="User ID"
                name="userId"
                type="text"
                error={errors.userId}
                className="mb-2"
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
              <a className="text-xs font-semibold text-pink-500 transition-colors hover:text-blue-700" href="./">
                Forget your password
              </a>
            </p>
            <Button isSubmitting={isSubmitting} name="login" className="mt-10" />
            <p className="block mt-4 font-sans text-xs text-base antialiased font-normal leading-relaxed text-center text-gray-700">
              Don't have an account?
              <a className="ml-1 font-semibold text-pink-500 transition-colors hover:text-blue-700" href="./register">
                Register Now!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
