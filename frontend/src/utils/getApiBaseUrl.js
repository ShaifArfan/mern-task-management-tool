const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return import.meta.env.VITE_API_BASE_URL;
};
export default getApiBaseUrl;
