import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { GoBell } from 'react-icons/go';
import { HiBars3 } from 'react-icons/hi2';
import { IoSearchOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import '../style/navbar.css';
import UserInfo from '../components/UserInfo';

const Navbar = ({ auth }) => {
   const [isShow, setIsShow] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const openPopup = () => {
      setIsShow(!isShow);
   };
   return (
      <div className="navbar">
         <div className="navbar-top">
            <div>
               <Link
                  onClick={() => setIsShow(false)}
                  className="navbar__logo"
                  to="/"
               >
                  Ludahh
               </Link>
            </div>
            <div className="navbar-auth">
               <div className="icon">
                  <GoBell size={22} />
               </div>
               {auth ? (
                  <div className="bars-container">
                     <div className="icon">
                        <HiBars3 onClick={openPopup} size={28} />
                     </div>
                     {isShow ? (
                        <UserInfo auth={auth} setIsShow={setIsShow} />
                     ) : null}
                  </div>
               ) : (
                  <Link onClick={() => setIsShow(false)} to="/login">
                     <div className="icon">
                        <FaUserAlt />
                     </div>
                  </Link>
               )}
               {/* <Link>999 truy cập</Link> */}
            </div>
         </div>
         {/* <div className="navbar-bottom">
            <div className="navbar-menu">
               {auth?.isAdmin ? (
                  <>
                     <Link to="/write">viết</Link>
                     <Link to="/user-manage">ql người dùng</Link>
                     <Link to="/post-manage">ds bài đăng</Link>
                     <Link to="/category">danh mục/tag</Link>
                  </>
               ) : null}
            </div>
         </div> */}
      </div>
   );
};

export default Navbar;
