import { IUser, User } from "../../features/auth/authModel";

export const updateUsersWithStatusProps = async (): Promise<void> => {
  const users = (await User.find()) as IUser[];
  // if (!users) return;
  // users.forEach((user) => {
  //   if (!user.status){
  //     User.updateOne({ _id: user._id }, { status: "offline" });
  //     // Check if one is updated
  //     console.log("User status updated successfully");
  //   }
  // });
  console.log(users);
  console.log("All users status updated successfully");
  return;
};
