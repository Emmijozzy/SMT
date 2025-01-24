function NotFound() {
  return (
    <main className="w-screen mt-0 transition-all duration-200 ease-in-out bg-[#000]" data-theme="dark">
      <section className="h-screen min-h-screen">
        <div className="relative flex w-full h-full">
          <span className="absolute top-0 right-0 w-full lg:w-[60%] h-[100%] bg-blueover-gradient" />
          <span className="absolute bottom-0 left-0 w-full lg:w-[60%] h-[100%] bg-purple-gradient" />
          <div className="container z-10">
            <div className="flex flex-wrap items-center justify-center w-full h-full">
              <div className="h-[40rem] w-[70rem] flex bg-black rounded-lg overflow-hidden relative">
                <div className="w-1/2 flex flex-col items-center justify-center p-10">
                  <h1 className="text-7xl font-extrabold text-primary">404</h1>
                  <p className="text-lg text-error mt-4">Page Not Found</p>
                  <p className="text-sm text-neutral mt-2 text-center">
                    Sorry, the page you are looking for does not exist or has been moved.
                  </p>
                  <a href="/" className="btn btn-primary mt-6">
                    Go to Homepage
                  </a>
                </div>
                <div className="w-1/2 bg-cover bg-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full text-primary opacity-20"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 9l6 6M15 9l-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
