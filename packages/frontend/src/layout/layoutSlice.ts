/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface Layout {
  slideBar: boolean;
  settingBar: boolean;
  themes: string;
  selectColor: string;
}

// const layoutData = JSON.parse(localStorage.getItem("layout") || "") as Layout;

const initialState: Layout = (JSON.parse(localStorage.getItem("layout") || "null") as Layout) || {
  slideBar: false,
  settingBar: false,
  themes: "system",
  selectColor: "bg-pink-gradient",
};
const layoutSlice = createSlice({
  name: "Layout",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      const openSidebar = action.payload as boolean;
      if (!openSidebar) {
        state.slideBar = openSidebar;
      } else {
        state.slideBar = !state.slideBar;
      }
    },
    setSettingBar: (state, action) => {
      const openSettingBar = action.payload as boolean;
      if (!openSettingBar) {
        state.settingBar = openSettingBar;
      } else {
        state.settingBar = !state.slideBar;
      }
    },
    setThemes: (state, action) => {
      const theme = action.payload as string;
      state.themes = theme;
    },
    setSelectColor: (state, action) => {
      const selectColor = action.payload as string;
      state.selectColor = selectColor;
    },
  },
});

export const { setSidebar, setSettingBar, setThemes, setSelectColor } = layoutSlice.actions;

export default layoutSlice.reducer;
