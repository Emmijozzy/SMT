/* eslint-disable react/jsx-props-no-spreading */
import Avatar from "@mui/material/Avatar";
import stringAvatar from "../utils/stringToColor";

interface Props {
  name: string;
  className?: string;
  imgUrl?: string;
}

function Avartar({ imgUrl, name, className }: Props) {
  let content;
  //   if (imgUrl?.trim()) {
  //     content = <img src={imgUrl} className="h-12 w-12 bg-white rounded-full border" alt="..." />;
  //   } else {
  //     content = <Avatar {...stringAvatar(name)} className={`w-[3rem] h-[3rem] ${className || ""} `}  />;
  //  }

  content = <Avatar {...stringAvatar(name)} className={`w-12 h-12 ${className || ""} `} src={imgUrl} />;

  return content;
}

Avartar.defaultProps = {
  className: "",
  imgUrl: "",
};

export default Avartar;
