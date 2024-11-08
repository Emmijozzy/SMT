import { FormikErrors } from "formik";
import React from "react";
import Button from "../../../shared/components/Button";
import FormInput from "../../../shared/components/FormInput";
import { RegisterData } from "../authInterface";

type Props = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleBlur: (e: React.FocusEvent<unknown, Element>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  errors: FormikErrors<RegisterData>;
  values: RegisterData;
  isSubmitting: boolean;
};

function RegisterForm({ handleSubmit, handleBlur, handleChange, errors, values, isSubmitting }: Props) {
  return (
    <div className="h-full w-full lg:w-[46%] rounded-lg lg:rounded-r-lg bg-[#1c1d21] px-14 py-7 flex items-center justify-center ">
      <div className="flex flex-col h-full">
        <div className="mb-5">
          <h4 className="h4">
            Register on <span className="font-bold text-transparent bg-clip-text bg-pink-gradient">STM</span>
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
                className="mt-1"
              />
              <FormInput
                name="lastName"
                tagName="Last Name"
                error={errors.lastName}
                type="text"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                className="mt-1"
              />
              <FormInput
                name="email"
                tagName="Email"
                error={errors.email}
                type="text"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="mt-1"
              />
              <FormInput
                name="password"
                tagName="Password"
                error={errors.password}
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                className="mt-1"
              />
              <FormInput
                name="confirmPassword"
                tagName="Confirm Password"
                error={errors.confirmPassword}
                type="password"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <Button isSubmitting={isSubmitting} name="Register" className="mt-8" />
            <p className="block mt-4 font-sans text-xs text-base antialiased font-normal leading-relaxed text-center text-gray-700">
              Already have an account?
              <a className="ml-1 font-semibold text-pink-500 transition-colors hover:text-blue-700" href="/login">
                Login Now!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
