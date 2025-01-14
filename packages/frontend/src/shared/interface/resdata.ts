interface ResData<T> {
  error?: {
    data: {
      message: string;
    };
  };
  data: {
    message: string;
    data: T | T[];
  };
}

export default ResData;
