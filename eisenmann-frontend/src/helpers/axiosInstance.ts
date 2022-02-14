import axios from 'axios';

const API_ENDPOINT = process.env.API_URL

export const axiosInstanceServerSide = (accessToken: any, timeout = 5000) => {

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


// export const axiosInstanceFetch = (any, timeout = 5000) => {
//   const axiosInstance = axios.create({
//     baseURL: API_ENDPOINT,
//     timeout: timeout,
//     headers: {
//       Authorization:
//         ? 'Bearer ' + accessToken
//         : '',
//       'Content-Type': 'application/json',
//       accept: 'application/json',
//     },
//   });

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async function (error: AxiosError) {
//       const originalRequest = error.config;

//       if (typeof error.response === 'undefined') {
//         if (typeof window !== 'undefined') {

//           alert(
//             'A server/network error occurred. ' +
//             'Looks like CORS might be the problem. ' +
//             'Sorry about this - we will get it fixed shortly.'
//           );
//         } else {
//           console.log('Something went wrong...');
//         }
//         return Promise.reject(error);
//       }
//       if (
//         error.response.status === 401 &&
//         error.response.statusText === 'Unauthorized'
//       ) {
//         const new= await get)
//         try {
//           if (new {
//             axiosInstance.defaults.headers['Authorization'] =
//               'Bearer ' + newaccessToken;
//             originalRequest.headers['Authorization'] =
//               'Bearer ' + newaccessToken;

//             return axiosInstance(originalRequest);
//           } else {
//             console.log('Refresh token invalid. SignOut...');
//           }
//         } catch (error) {
//           console.log(error);
//           console.log('Refresh token invalid. SignOut...');
//         }

//       }

//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance
// }
