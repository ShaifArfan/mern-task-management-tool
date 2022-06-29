const getApiBaseUrl = () => {
	if (import.meta.env.MODE === 'development') {
		return 'http://localhost:8000';
	}
	return import.meta.env.VITE_API_BASE_URL;
};
export default getApiBaseUrl;
