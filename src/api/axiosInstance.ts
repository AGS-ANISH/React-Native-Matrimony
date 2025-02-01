import axios from 'axios';
import { baseUrl , token} from '../constant'; // Import the baseUrl

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`, // Use the baseUrl here
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  console.log("Setting Token:",token);
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']; // Remove the token if not available
  }
};
setAuthToken(token);

export default axiosInstance;
