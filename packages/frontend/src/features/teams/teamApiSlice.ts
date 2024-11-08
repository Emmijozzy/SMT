/* eslint-disable indent */
import { apiSlice } from "../../app/api/apislice";
import log from "../../shared/utils/log";
import { ITeam } from "./teamInterface";
import { setTeams } from "./teamSlice";

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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTeams(data));
        } catch (e: unknown) {
          const error = e as Error;
          log("error", "TeamApi getTeam Error", error.message, error.stack as string);
        }
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

    updateTeam: build.mutation<ITeam, { teamId: string; updatedTeam: ITeam }>({
      query: ({ teamId, updatedTeam }) => ({
        url: `/team/update/?id=${teamId}`,
        method: "PUT",
        body: { ...updatedTeam },
        validateStatus: (response, result: Result) =>
          response.status === 200 || response.status === 204 || !result.isError,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Team" as const, id: arg.teamId }],
    }),
  }),
});
export const { useGetTeamsQuery, useCreateTeamMutation, useUpdateTeamMutation } = teamApiSlice;
