export type IAlert = {
  display?: boolean;
  message: string;
  type: "success" | "warning" | "error" | "info" | boolean;
  id: string;
};

export interface AlertState {
  alerts: IAlert[];
  totalTime: number;
}
