import { IUser } from "../../features/users/userInterface";

interface ResData {
  error?: ResData;
  data: {
    message: string;
    data: IUser;
  };
}

export default ResData;
