import { useSelector } from "react-redux";
import signUpSvg from "../../assets/images/SvG/Sign up-amico.svg";
import { RootState } from "../../app/store";
import RegisterForm from "./components/RegisterForm";
import LeftImage from "./components/LeftImage";
import Alerts from "../alerts/Alerts";
import useRegister from "./hooks/useRegister";

function Register() {
  const alerts = useSelector((state: RootState) => state.alert.alerts);

  const { isSubmitting, handleSubmit, handleBlur, handleChange, errors, values } = useRegister();

  return (
    <main data-theme="dark" className="w-screen mt-0 transition-all duration-200 ease-soft-in-out bg-[#000]">
      <section className="h-screen min-h-screen">
        <div className="relative flex w-full h-full">
          <Alerts alerts={alerts} />
          <span className="absolute top-0 right-0 w-full lg:w-[60%] h-[100%] bg-blueover-gradient" />
          <span className="absolute bottom-0 left-0 w-[60%] h-[100%] bg-purple-gradient" />
          <div className="container z-10">
            <div className="flex flex-wrap items-center justify-center w-full h-full">
              <div className="h-[40rem] w-[70rem] flex bg-black rounded-lg">
                <LeftImage imgUrl={signUpSvg} />
                <RegisterForm
                  handleSubmit={handleSubmit}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  values={values}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Register;
