import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { setSettingBar, setSidebar } from "../../../layoutSlice";

export const useHeadNavbar = () => {
  const [showAddNav, setAddNav] = useState(false);
  const dispatch = useDispatch();

  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile);

  const ref = useClickOutside(() => {
    // console.log("clicked outside nav");
    setAddNav(false);
  });

  const handleSidebar = () => dispatch(setSidebar(true));
  const handleSettingBar = () => dispatch(setSettingBar(true));
  const handleAddNav = () => setAddNav((prev) => !prev);

  return {
    showAddNav,
    userProfile,
    ref,
    handleSidebar,
    handleSettingBar,
    handleAddNav,
  };
};
