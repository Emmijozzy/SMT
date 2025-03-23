import { SocketUserDataType } from "./manageUserDataType";

export const getUserIdBySocketId = (mapData: Map<string, SocketUserDataType>, socketId: string): string | null => {
  console.log(socketId, "socketId", mapData);
  for (const [userId, userData] of mapData.entries()) {
    if (userData.socketId === socketId) {
      return userId;
    }
  }
  return null;
};
