import ImageSlider from "../../shared/components/ImageSlider";
import { heroImages } from "../../shared/constants/heroImages";

function Home() {
  return (
    <main className="w-screen mt-0 transition-all duration-300 ease-in-out bg-[#000]" data-theme="dark">
      <section className="h-screen min-h-screen">
        <div className="relative flex w-full h-full">
          <span className="absolute top-0 right-0 w-full lg:w-[60%] h-[100%] bg-blueover-gradient" />
          <span className="absolute bottom-0 left-0 w-full lg:w-[60%] h-[100%] bg-purple-gradient" />
          <div className="container z-10">
            <div className="flex flex-wrap items-center justify-center w-full h-full">
              <div className="h-[40rem] w-[70rem] flex bg- rounded-lg overflow-hidden">
                <div className="relative h-full w-[54%] hidden lg:flex bg-[#8260ca] bg-pink-gradient rounded-l-lg items-center justify-center">
                  <div className="w-full h-full absolute top-0 left-0 bg-cover bg-center">
                    <ImageSlider images={heroImages} />
                  </div>
                  <div className="w-full h-full flex items-center justify-center bg-cover bg-center bg-[#8260ca] bg-pink-gradient absolute top-0 left-0 opacity-50">
                    <div className="h-[15rem] w-[15rem] flex items-center justify-center border-[1rem] bg-base-200 rotate-180 border-brand-gradient">
                      <h4 className="h1 -rotate-180">
                        <span className="font-bold text-transparent bg-clip-text bg-pink-gradient">
                          S<span className="text-[5rem]">T</span>M
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center p-10">
                  <h1 className="text-7xl font-extrabold text-primary">
                    Welcome to{" "}
                    <h4 className="h1">
                      <span className="font-bold text-transparent bg-clip-text bg-pink-gradient">
                        S<span className="text-[5rem]">T</span>M
                      </span>
                    </h4>
                  </h1>
                  <p className="text-lg text-context mt-4 text-center">
                    Simplify your tasks and manage your projects with ease.
                  </p>
                  <a href="/login" className="btn btn-primary mt-6">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
