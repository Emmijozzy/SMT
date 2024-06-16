// import { BallTriangle } from "react-loader-spinner";

type Props = {
  isLoading: boolean;
  transparent: boolean;
};

function Loader({ isLoading, transparent }: Props) {
  return (
    <div
      className={`absolute h-screen w-screen flex justify-center items-center bg-base-200 z-[999999] ${isLoading ? "" : "hidden"} ${transparent ? "bg-base-200/50" : ""}`}
    >
      <div className="loader_container">
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
        <div className="loader_block bg-primary" />
      </div>
    </div>
  );
}
export default Loader;
