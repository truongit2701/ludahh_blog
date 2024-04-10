import React, { useRef, useState } from 'react';
import '../../style/profile.css';
import { uploadImageCloudinary } from '../../services/upload';
import { updateAvatarUser, updateInfoUser } from '../../services/auth';
import { toast } from 'react-toastify';
import { updateAvatarRedux, updateInfoRedux } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

const Profile = ({ auth }) => {
   const [fullName, setFullName] = useState(auth?.fullName);
   const [avatarReview, setAvatarReview] = useState(null);
   const fileInputRef = useRef(null);

   const dispatch = useDispatch();

   const handleImageReview = async (e) => {
      setAvatarReview(e.target.files[0]);

      const responseImageUpload = await uploadImageCloudinary(
         e.target.files[0]
      );

      await updateAvatarUser(responseImageUpload.data.url);

      toast('🦄 Cập nhật avatar thành công!', {
         position: 'top-right',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: 'light',
      });

      dispatch(updateAvatarRedux(responseImageUpload.data.url));
   };

   const saveInfoUser = async () => {
      if (fullName === auth.fullName) return;
      await updateInfoUser(fullName);

      toast('🦄 Cập nhật thông tin thành công!', {
         position: 'top-right',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: 'light',
      });

      dispatch(updateInfoRedux(fullName));
   };
   console.log(fullName);
   const avatarUrl = !auth.avatar ? '/images/avatar.jpg' : auth.avatar;
   return (
      <div className="profile">
         <div className="profile-left">
            <div className="profile-img">
               <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageReview}
               />
               <img
                  src={
                     avatarReview
                        ? URL.createObjectURL(avatarReview)
                        : avatarUrl
                  }
                  alt="profile-img"
               />
            </div>
            <div className="profile-name">
               <button
                  className="btn success"
                  onClick={() => fileInputRef.current.click()}
               >
                  Đổi avatar
               </button>
               <h1>Võ Văn Trường</h1>
               <p>{!auth.isAdmin ? 'Người dùng' : 'Admin'}</p>
            </div>
         </div>

         <div className="profile-right">
            <div className="info">
               <div className="info-item">
                  <div>Tài khoản</div>
                  <input
                     type="text"
                     disabled
                     className="input"
                     value={auth.username}
                  />
               </div>

               <div className="info-item">
                  <div>Tên đầy đủ</div>
                  <input
                     onChange={(e) => setFullName(e.target.value)}
                     type="text"
                     className="input"
                     value={fullName}
                  />
               </div>

               <div className="info-item">
                  <div>Email</div>
                  <input
                     type="text"
                     className="input"
                     value={'abc@gmail.com'}
                  />
               </div>

               <button onClick={saveInfoUser} className="btn save-btn">
                  Cập nhật
               </button>
            </div>
         </div>
      </div>
   );
};

export default Profile;
