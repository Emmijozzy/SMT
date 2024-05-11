/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert as Alart } from "@mui/material";
import { removeAlert } from "./AlertSlice";
import { IAlert } from "./alertInterface";

function Alert({ display, message, type }: IAlert) {
  const [isDisPlay, setDisplay] = useState<boolean>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (display) {
      setDisplay(true);
    }

    const delay = type === "info" ? 120000 : 6000;

    const timeoutId = setTimeout(() => {
      dispatch(removeAlert());
      setDisplay(false);
    }, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div
      className={`flex flex-col w-full z-40 transition duration-400 ease-soft-in-out ${isDisPlay ? "block" : "hidden"}`}
    >
      {typeof type == "string" && (
        <Alart severity={type} className="flex items-center text-lg bold bg-base-300 text-wrap">
          {message}
        </Alart>
      )}
    </div>
  );
}
export default Alert;
