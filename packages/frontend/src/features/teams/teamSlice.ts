import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { ITeam } from "./teamInterface";

export const teamAdapter = createEntityAdapter({
  selectId: (team: ITeam) => team.teamId as string,
});

export const initialState = teamAdapter.getInitialState({});

const teamsSlice = createSlice({
  name: "team",
  initialState: teamAdapter.getInitialState(),
  reducers: {
    setTeams(state, action) {
      const teams = (action.payload as Record<string, ITeam> | readonly ITeam[]) || [];
      teamAdapter.setAll(state, teams);
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;

export const teamSelectors = teamAdapter.getSelectors<RootState>((state) => state.teams);
