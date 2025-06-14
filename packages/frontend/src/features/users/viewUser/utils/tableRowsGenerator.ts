import { IUser } from "../../userInterface";

export const generateTableRows = (user: IUser) => {
  if (!user) return [];
  return [
    { label: "User ID", value: user.userId || "" },
    { label: "Name", value: user.fullName || "", className: "" },
    { label: "Email", value: user.email || "", className: "" },
    { label: "Role", value: user.role.replace("_", " ") || "", className: "capitalize" },
    { label: "Team", value: user.team || "", className: "capitalize" },
    { label: "phone", value: user.phone_no?.toString() || "", className: "capitalize" },
    { label: "location", value: user.location || "", className: "capitalize" },
  ];
};
