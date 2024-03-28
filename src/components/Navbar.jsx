import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import '../style/navbar.css';
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = ({ auth }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleLogout = () => {
      dispatch(logout());
      navigate('/news');
   };
   return (
      <div>
         <div className="navbar">
            <div>
               <Link className="navbar__logo" to="/">
                  Ludahh
               </Link>
            </div>
            <div className="navbar__menu">
               {/* <Link>về tôi</Link> */}
               <Link to="/">đọc</Link>
               {auth?.isAdmin ? (
                  <>
                     <Link to="/write">viết</Link>
                     <Link to="/user-manage">ql người dùng</Link>
                     <Link to="/post-manage">ds bài đăng</Link>
                     <Link to="/category">danh mục/tag</Link>
                  </>
               ) : null}
               <Link>999 truy cập</Link>
               {auth ? (
                  <IoLogOutOutline onClick={handleLogout} size={20} />
               ) : (
                  <Link to="/login">
                     <FaUserAlt />
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
