import { apiSlice } from "../../../app/api/apislice";
import AddUser from "./AddUserInterface";

export const addUserApislice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (userData: AddUser) => ({
        url: "/user_admin/create",
        method: "POST",
        body: { ...userData },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = addUserApislice;
