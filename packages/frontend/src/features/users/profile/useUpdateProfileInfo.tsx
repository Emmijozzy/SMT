import { useFormik } from "formik";
import log from "../../../shared/utils/log";
import { loginSchema } from "../../auth/authValidation";
import { useState } from "react";

const initialValues = {
FirstName: "Joseph",
LastName: "Ogunsuyi",
email: "emmijozzy@gamilvsbdgvgdfvshgjhmdfhjh.com",
dept: "Web Development",
phone: "+2349032846121",
location: "Lagos, Nigeria",
whatsappLink: "",
facebookLink: "",
linkedInLink: "",
}

const useUpdateProfileInfo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const data = await login({ ...values });
        setResData(data);
      } catch (e) {
        const error = e as Error;
        log("error", "Login Error", error.message, error.stack as string);
      } finally {
        setIsSubmitting(false);
      }
    },
  });


  return ()
}
export default useUpdateProfileInfo;