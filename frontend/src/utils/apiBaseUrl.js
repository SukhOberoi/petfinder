export const getApiBaseUrl = () => {
    return process.env.VITE_API_BASE_URL || `${getApiBaseUrl()}`;
  };