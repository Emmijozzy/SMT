/* eslint-disable indent */
import { adminRoutes, managerRoutes, memberRoutes } from "../constants";

type Role = "team_member" | "manager" | "admin";

export const getUserNavItem = (role: Role) => {
  switch (role) {
    case "admin":
      return adminRoutes;
    case "manager":
      return managerRoutes;
    case "team_member":
      return memberRoutes;
    default:
      return memberRoutes;
  }
};
