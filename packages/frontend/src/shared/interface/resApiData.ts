export type ResApiData<T> = {
  error?: {
    data: {
      message: string;
    };
  };
  message: string;
  data: T | T[];
  isSuccess: boolean;
  isError: boolean;
};
