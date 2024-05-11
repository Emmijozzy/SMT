export type IAlert = {
  display?: boolean;
  message: string;
  type: "success" | "warning" | "error" | "info";
  id: string;
};

export interface AlertState {
  alerts: IAlert[];
  totalTime: number;
}
