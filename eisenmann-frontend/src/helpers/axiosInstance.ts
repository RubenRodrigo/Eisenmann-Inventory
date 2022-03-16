import axios from 'axios';

const API_ENDPOINT = process.env.API_URL

/**
 * Returns the an AxiosInstance
 * @param {number} accessToken. Because we have 
 * @param {number} timeout
 * @returns AxiosInstance
 */
export const axiosInstanceServerSide = (accessToken?: string, timeout = 5000) => {

  const axiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: timeout,
    headers: {
      Authorization: accessToken
        ? 'Bearer ' + accessToken
        : '',
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {

      if (typeof error.response === 'undefined') {
        console.log(
          'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.'
        )
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized'
      ) {
        console.log("FAILED", error.response.data);
        return Promise.reject(error);
      }

      // specific error handling done elsewhere
      return Promise.reject(error);
    }
  );

  return axiosInstance
}