function Page404() {
  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col bg-base-200 rounded-lg py-2 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-10 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-40 h-40 text-primary opacity-10 absolute"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9 9l6 6M15 9l-6 6" />
          </svg>
          <h1 className="text-7xl font-extrabold text-primary z-10">404</h1>
          <p className="text-lg text-error mt-4 z-10">Page Not Found</p>
          <p className="text-sm text-base-content/70 mt-2 text-center z-10">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <a href="/" className="btn btn-primary mt-6 z-10">
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page404;
