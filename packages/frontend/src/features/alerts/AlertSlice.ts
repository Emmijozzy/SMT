import { createSlice } from "@reduxjs/toolkit";
import { AlertState, IAlert } from "./alertInterface";
import generateAlertId from "../../shared/utils/generateId";

const initialState: AlertState = {
  alerts: [
    // {
    //   message: "errjhfzdhbhzbcjnkdmjkjkmnkjnmkjnmmkjilkhujhouihnkh,jnku,h.jn.kjn.ljn,kjnjkn.jns",
    //   type: "error",
    //   id: "uerruehky",
    // },
    // {
    //   message: "errjhfzdhbhzbcjnkdmjkjkmnkjnmkjnmjlkhjikghiyuilhjkhhmk.jn.kjn.ljn,kjnjkn.jns",
    //   type: "success",
    //   id: "uerruehky",
    // },
    // {
    //   message: "errjhfzdhbhzbcjnkdmjkjkmnkjnmkjnmmk.jn.kjn.ljn,kjnjyuigkyhi87yuhi87yukn.jns",
    //   type: "info",
    //   id: "uerruehky",
    // },
  ],
  totalTime: 0,
};

const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const { message, type } = action.payload as IAlert;
      state.alerts.push({ message, type, id: generateAlertId() });
    },
    removeAlert: (state) => {
      state.alerts.shift();
    },
    // cancelAlert: (state, action) => {},
  },
});

export const { addAlert, removeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
