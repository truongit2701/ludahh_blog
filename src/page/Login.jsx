import React, { useEffect, useState } from 'react';
import '../style/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
   const auth = useSelector((state) => state.auth.login.user);
   const [fetching, setFetching] = useState(false);
   const [error, setError] = useState('');
   const [info, setInfo] = useState({ username: '', password: '' });
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (auth) navigate('/news');

      return;
   }, [auth, navigate]);

   /**
    * handle login
    * */
   const handleLogin = async (e) => {
      e.preventDefault();

      await login(info, setFetching, navigate, setError, dispatch);
   };
   return (
      <div className="login">
         {fetching && <Loading />}
         <form action="" className="login-form" onSubmit={handleLogin}>
            {error && <p className="text-error">{error}</p>}
            <div>
               <input
                  type="text"
                  value={info.username}
                  onChange={(e) =>
                     setInfo({ ...info, username: e.target.value })
                  }
                  placeholder="Tên đăng nhập"
               />
            </div>
            <div>
               <input
                  type="password"
                  value={info.password}
                  onChange={(e) =>
                     setInfo({ ...info, password: e.target.value })
                  }
                  placeholder="****"
               />
            </div>
            <div>
               <Link to="/register">Chưa có tài khoản! Đăng ký</Link>
               <button type="submit" className="login-btn">
                  Đăng nhập
               </button>
            </div>
         </form>
      </div>
   );
};

export default Login;
