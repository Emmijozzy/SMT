/* eslint-disable react/jsx-props-no-spreading */
import Avatar from "@mui/material/Avatar";
import stringAvatar from "../../shared/utils/stringToColor";

interface Props {
  name: string;
}

function Avartar({ name }: Props) {
  return (
    <div>
      <Avatar {...stringAvatar(name)} className="w-[3rem] h-[3rem]" />
    </div>
  );
}
export default Avartar;
