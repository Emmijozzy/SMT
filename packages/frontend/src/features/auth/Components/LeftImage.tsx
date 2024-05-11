type Props = {
  imgUrl: string;
};
function LeftImage({ imgUrl }: Props) {
  return (
    <div className="h-full w-[54%] hidden lg:flex bg-[#8260ca] bg-pink-gradient rounded-l-lg items-center justify-center">
      <img src={imgUrl} alt="Login" className="w-[90%]" />
    </div>
  );
}
export default LeftImage;
