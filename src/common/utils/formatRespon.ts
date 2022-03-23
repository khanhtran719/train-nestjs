export const responsFormat = (
  data: any,
  error: number,
  message: string,
  errors: [],
): any => {
  return {
    data: data,
    errorCode: error,
    message: message,
    errors: errors,
  };
};
