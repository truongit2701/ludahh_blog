import React from 'react';
import { BsVectorPen } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const UserInfo = ({ auth, setIsShow }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logout());
      navigate('/news');
   };
   return (
      <div className="popup-info">
         <div className="profile-popup">
            <div className="email">abc@gmail.com</div>
            <p onClick={() => navigate('/profile')}>Set up your profile</p>
         </div>

         <div className="activity">
            {auth?.isAdmin ? (
               <div
                  className="activity-item"
                  onClick={() => {
                     navigate('/write');
                     setIsShow(false);
                  }}
               >
                  <div className="icon">
                     <BsVectorPen />
                  </div>
                  <p>Viết</p>
               </div>
            ) : null}
            <div className="activity-item" onClick={handleLogout}>
               <div className="icon">
                  <MdOutlineLogout />
               </div>
               <p>Đăng xuất</p>
            </div>
         </div>
      </div>
   );
};

export default UserInfo;
