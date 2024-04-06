import React, { useState } from 'react';
import '../style/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import Loading from '../components/Loading';

const Register = () => {
   const [fetching, setFetching] = useState(false);
   const [error, setError] = useState('');
   const [info, setInfo] = useState({
      username: '',
      password: '',
      confirmPassword: '',
   });
   const [passwordMatch, setPasswordMatch] = useState(true);

   const handleRegister = async (e) => {
      e.preventDefault();
      setPasswordMatch(true);

      if (info.password !== info.confirmPassword) {
         setPasswordMatch(false);
         return;
      }

      // Tiếp tục xử lý khi mật khẩu trùng khớp
      await register(info, setFetching, setError);
   };

   return (
      <div className="login">
         {fetching && <Loading />}
         <form className="login-form" onSubmit={handleRegister}>
            {error && <p className="text-error">{error}</p>}
            {!passwordMatch && <p className="error">Mật khẩu không khớp</p>}

            <input
               type="text"
               value={info.username}
               onChange={(e) =>
                  setInfo((prev) => ({ ...prev, username: e.target.value }))
               }
               placeholder="Tên đăng nhập"
            />
            <input
               type="password"
               value={info.password}
               onChange={(e) =>
                  setInfo((prev) => ({ ...prev, password: e.target.value }))
               }
               placeholder="****"
            />
            <input
               type="password"
               value={info.confirmPassword}
               onChange={(e) =>
                  setInfo((prev) => ({
                     ...prev,
                     confirmPassword: e.target.value,
                  }))
               }
               placeholder="****"
            />
            <Link to="/login">Đã có tài khoản</Link>
            <button type="submit" className="login-btn">
               Đăng ký
            </button>
         </form>
      </div>
   );
};

export default Register;
