/* eslint-disable indent */
import { apiSlice } from "../../app/api/apislice";
import { ITeam } from "./teamInterface";

type TeamResponse = ITeam[];

interface ResData {
  data: ITeam[];
}

type Result = {
  data: ITeam[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  statusCode: number;
};

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<TeamResponse, void>({
      query: (query) => {
        const filteredQuery = query as unknown as Record<string, string>;
        if (typeof filteredQuery == "object") {
          const stringifyQuery = JSON.stringify(filteredQuery);
          return {
            url: `/team/teams?filters=${stringifyQuery}`,
            validateStatus: (response, result: Result) => response.status === 200 || !result?.isError,
          };
        }
        return {
          url: "/team/teams",
          validateStatus: (response, result: Result) => response.status === 200 || !result.isError,
        };
      },
      transformResponse: (responseData: ResData) => {
        const teams = responseData?.data;
        return teams.map((team: ITeam) => ({
          ...team,
          _id: team.teamId,
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((team) => ({
                type: "Teams" as const,
                id: team.teamId || "UNKNOWN", // Fallback in case teamId is undefined
              })),
              { type: "Teams", id: "LIST" },
            ]
          : [{ type: "Teams", id: "LIST" }],
    }),

    createTeam: build.mutation<ITeam, ITeam>({
      query: (teamData: ITeam) => ({
        url: "/team/create",
        method: "POST",
        body: { ...teamData },
        validateStatus: (response, result: Result) =>
          response.status === 201 || response.status === 200 || !result.isError,
      }),
      invalidatesTags: [{ type: "Teams" as const, id: "LIST" as const }],
    }),
  }),
});
export const { useGetTeamsQuery, useCreateTeamMutation } = teamApiSlice;
