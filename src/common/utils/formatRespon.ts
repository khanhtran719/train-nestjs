export const responsFormat = (data: any): any => {
  if (data) {
    return {
      data: data,
      errorCode: 0,
      message: '',
      errors: [],
    };
  }
};

export const deleteSuccess = () => {
  return {
    status_code: 200,
    errorCode: 0,
    message: 'Delete Successfully',
    errors: [],
  };
};
