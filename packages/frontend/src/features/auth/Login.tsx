import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import loginImage from "../../assets/images/SvG/Computer login-rafiki.svg";
import Alerts from "../alerts/Alerts";
import LoginForm from "./components/LoginForm";
import LeftImage from "./components/LeftImage";
import useLogin from "./hooks/useLogin";

function Login() {
  const alerts = useSelector((state: RootState) => state.alert.alerts);

  const { isSubmitting, handleSubmit, handleBlur, handleChange, errors, values } = useLogin();

  return (
    <main className="w-screen mt-0 transition-all duration-200 ease-soft-in-out bg-[#000]" data-theme="dark">
      <section className="h-screen min-h-screen">
        <div className="relative flex w-full h-full">
          <Alerts alerts={alerts} />
          <span className="absolute top-0 right-0 w-full lg:w-[60%] h-[100%] bg-blueover-gradient" />
          <span className="absolute bottom-0 left-0 w-full lg:w-[60%] h-[100%] bg-purple-gradient" />
          <div className="container z-10">
            <div className="flex flex-wrap items-center justify-center w-full h-full">
              <div className="h-[40rem] w-[70rem] flex bg-black rounded-lg">
                <LeftImage imgUrl={loginImage} />
                <LoginForm
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

export default Login;
