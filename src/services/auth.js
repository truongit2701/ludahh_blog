import axios from '../customize/axios';
import { loginSuccess } from '../redux/authSlice';

export const register = async (info, setFechting) => {
   const { username, password } = info;
   setFechting(true);
   try {
      const res = await axios.post('/auth/register', {
         username,
         password,
      });
      setFechting(false);
      return res;
   } catch (err) {
      setFechting(false);
   }
};

export const login = async (
   info,
   setFechting,
   navigate,
   setError,
   dispatch
) => {
   const { username, password } = info;
   setFechting(true);
   try {
      const res = await axios.post('/auth/login', {
         username,
         password,
      });
      setFechting(false);
      if (res.status === 200) {
         dispatch(loginSuccess(res.data));
         navigate('/');
      }
      return res;
   } catch (err) {
      setError(err.message);
      setFechting(false);
   }
};

export const fetchUser = async () => {
   try {
      const res = await axios.get('user');
      if (res.status === 200) return res.data;
   } catch (error) {
      throw error;
   }
};
