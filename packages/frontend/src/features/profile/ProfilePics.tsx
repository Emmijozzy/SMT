/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import profilePices from "../../assets/images/joseph _pics.png";

type Props = {};
function ProfilePics(props: Props) {
  return (
    <div className="w-full bg-base-100 rounded-lg pb-2">
      <div className="absolute w-full h-40 overflow-hidden">
        <div className="w-[90%] h-full bg-primary mx-auto rounded-b-xl right-[50%]  bg-[url('./../assets/images/curved14.jpg')] bg-cover bg-no-repeat bg-center">
          <div className="relative w-full h-full">
            <div className="absolute w-full h-full bg-base-100/20" />
          </div>
        </div>
      </div>
      <div className="relative w-full flex z-10">
        <div className="w-64 h-64 mx-auto mt-10 rounded-full overflow-hidden border border-base-100 border-[16px]">
          <img src={profilePices} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
export default ProfilePics;
