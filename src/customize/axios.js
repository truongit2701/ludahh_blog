import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const baseURL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`;

let auth = null;

const instance = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
   },
});

instance.interceptors.request.use(
   async function (config) {
      auth = localStorage.getItem('ludahh_auth')
         ? JSON.parse(localStorage.getItem('ludahh_auth'))
         : null;
      if (!auth) {
         return config;
      }
      const user = jwtDecode(auth.at);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
         config.headers.Authorization = `Bearer ${auth.at}`;
         return config;
      }

      try {
         const response = await axios.post(`${baseURL}/auth/refresh`, null, {
            headers: {
               Authorization: `Bearer ${auth.rt}`,
            },
         });

         localStorage.setItem(
            'ludahh_auth',
            JSON.stringify({
               ...auth,
               rt: response.data.refresh_token,
               at: response.data.access_token,
            })
         );

         config.headers.Authorization = `Bearer ${response.data.at}`;

         return config;
      } catch (err) {
         console.log('Lỗi call axios khi refresh token', err);
      }
      return config;
   },
   function (error) {
      console.log('Lỗi send request', error);
      return Promise.reject(error);
   }
);

instance.interceptors.response.use(
   function (response) {
      console.log('♥️ ~ response:', response.data);
      return response.data;
   },
   function (error) {
      console.log('Lỗi trả response', error);
      toast(`🦄  ${error.response.data.message}`, {
         position: 'top-right',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: 'light',
      });
      return Promise.reject(error.response.data);
   }
);

export default instance;
