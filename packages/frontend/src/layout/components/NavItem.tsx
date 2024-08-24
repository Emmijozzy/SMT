// import { MouseEvent } from "react";
import { Button, Typography, SvgIconTypeMap } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type MuiIcon = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};

interface Props {
  title: string;
  path?: string;
  Icon: MuiIcon;
  className?: string;
  onClick?: () => Promise<void>;
}

function NavItem({ title, path, Icon, className, onClick }: Props) {
  const location = useLocation();
  const selectColor = useSelector((state: RootState) => state.layout.selectColor);

  // const selectedColor = ((color: string) => `bg-${color}-gradient`)("red");
  const isNavActive = (): boolean =>
    title.toLowerCase() === "dashboard"
      ? path == location.pathname
      : location.pathname.toLowerCase().includes(title.toLowerCase());

  return (
    <NavLink to={path || ""} className={`${className || ""}`}>
      <Button
        className={`${isNavActive() ? "bg-base-100 shadow-md font-semibold" : "font-medium"} flex items-center justify-start whitespace-nowrap shadow-soft-xl gap-2.7 px-4 text-left rounded-lg my-0 py-2.7 capitlalize  `}
        fullWidth
        onClick={onClick}
      >
        <div
          className={`${isNavActive() ? selectColor : "bg-base-100"} flex items-center justify-center w-8 h-8 rounded-lg shadow-md  xl:p-2.5`}
        >
          <Icon className={`${isNavActive() ? "text-base-100" : "text-base-content"} w-5 h-5 `} />
        </div>
        <Typography className="font-sans leading-relaxed capitalize text-base-content">{title}</Typography>
      </Button>
    </NavLink>
  );
}

NavItem.defaultProps = {
  className: "",
  path: "",
  onClick: () => "",
};
export default NavItem;
