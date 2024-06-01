import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import profics from "../../assets/images/joseph _pics.png";

function Profile() {
  return (
    <section className="w-full z-10 pb-4">
      <div className="relative w-full flex flex-col flex-nowrap gap-4 bg-base-200 ">
        <div className="w-full bg-base-100 rounded-lg pb-2">
          <div
            className="absolute w-full h-40 overflow-hidden"
            // style={{ backgroundImage: url("../../assets/images/curved14.jpg") }}
          >
            <div className="w-[90%] h-full bg-primary mx-auto rounded-b-xl right-[50%]  bg-[url('./../assets/images/curved14.jpg')] bg-cover bg-no-repeat bg-center">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-base-100/20" />
              </div>
            </div>
          </div>
          <div className="relative w-full flex z-10">
            <div className="w-64 h-64 mx-auto mt-10 rounded-full overflow-hidden border border-base-100 border-[16px]">
              <img src={profics} alt="" />
            </div>
          </div>
        </div>

        <div className="w-full p-4 bg-base-100 rounded-lg bg-base-100">
          <div className="w-full flex items-center justify-between">
            <h6 className="h6 capitalize font-bold">Profile Information</h6>
            <button type="button" aria-label="Edit User" className="cursor-pointer">
              <EditIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="flex flex-col flex-nowrap text-base-content">
            <div className="flex w-full h-16 items-center border-b-2 border-base-content">
              <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">Fullname :</p>
              <p className="w-40 md:w-[50%] body-1 truncate ... hover:text-clip capitalize">Ogunsuyi Joseph</p>
            </div>
            <div className="flex w-full h-16 items-center border-b-2 border-base-content">
              <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">Email :</p>
              <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip">
                emmijozzy@gamilvsbdgvgdfvshgjhmdfhjh.com
              </p>
            </div>
            <div className="flex w-full h-16 items-center border-b-2 border-base-content">
              <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Dept. :</p>
              <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">Web development</p>
            </div>
            <div className="flex w-full h-16 items-center border-b-2 border-base-content">
              <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Phone :</p>
              <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">+2349032846121</p>
            </div>
            <div className="flex w-full h-16 items-center border-b-2 border-base-content">
              <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Location :</p>
              <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">Lagos, Nigeria</p>
            </div>
            <div className="flex w-full h-16 items-center  border-base-content">
              <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Social :</p>
              <div className="flex gap-4">
                <a aria-label="Whatsapp" href="http://eihkkk.com" className="cursor-pointer">
                  <WhatsAppIcon className="w-7 h-7" />
                </a>
                <a aria-label="Whatsapp" href="http://eihkkk.com" className="cursor-pointer">
                  <FacebookIcon className="w-7 h-7" />
                </a>
                <a aria-label="Whatsapp" href="http://eihkkk.com" className="cursor-pointer">
                  <LinkedInIcon className="w-7 h-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Profile;
