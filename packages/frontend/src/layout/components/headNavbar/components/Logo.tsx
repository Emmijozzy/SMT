import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <div className="h-full flex items-center md:px-4 mr-3 md:mr-8 xl:hidden">
      <Link to="/" className="w-full text-center">
        <Typography variant="h4" className="text-base-content font-bold text-shadow">
          S<span className="text-[3rem]">T</span>M
        </Typography>
      </Link>
    </div>
  );
}
