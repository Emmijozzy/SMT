/* eslint-disable react/jsx-props-no-spreading */
import Avatar from "@mui/material/Avatar";
import stringAvatar from "../utils/stringToColor";

interface Props {
  name: string;
  className?: string;
}

function Avartar({ name, className }: Props) {
  return <Avatar {...stringAvatar(name)} className={`w-[3rem] h-[3rem] ${className || ""} `} />;
}

Avartar.defaultProps = {
  className: "",
};

export default Avartar;
