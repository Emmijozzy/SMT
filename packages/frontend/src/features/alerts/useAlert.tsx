/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAlert } from "./AlertSlice";

type Props = {
  type: "success" | "warning" | "error" | "info";
  display: boolean;
};

const useAlert = ({ display, type }: Props) => {
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

  return {
    isDisPlay,
  };
};
export default useAlert;
