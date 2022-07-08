export const createError = ({message, status}) => {
  const error = new Error();
  error.message = message;
  error.statusCode = status;
  return error;
}