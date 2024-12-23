export type Result<T> = {
  data: T[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  statusCode: number;
};
