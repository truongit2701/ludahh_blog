import React from 'react';
import '../style/popup.css';
import { CiTimer } from 'react-icons/ci';
import { GoComment } from 'react-icons/go';
import { IoPersonOutline } from 'react-icons/io5';
import { FiEye } from 'react-icons/fi';
import Content from './Content';
import Tag from './Tag';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const Preview = ({
   closePopup,
   value,
   isOpen,
   title,
   banner,
   categoryId,
   tags,
}) => {
   // const theObj = { __html: value };
   const auth = useSelector((state) => state.auth.login.user);
   return (
      <div className={`popup ${isOpen ? 'open' : ''}`}>
         <div className="popup-content">
            <div className="main_post">
               <div className="main_post_banner">
                  <img src={banner} alt="main_post_img" width={'50%'} />
                  <div className="main_post_heading">
                     <p>{categoryId && categoryId.split('_')[1]}</p>
                     <p className="main_post_title">{title}</p>
                     <div>
                        <p>
                           <CiTimer />
                           <span>
                              {dayjs().locale('vi').format('DD-MM-YYYY HH:mm')}
                           </span>
                        </p>
                        <p>
                           <GoComment />
                           <span>0</span>
                        </p>
                        <p>
                           <IoPersonOutline />
                           <span>{auth.username}</span>
                        </p>
                        <p>
                           <FiEye />
                           <span>1</span>
                        </p>
                     </div>
                  </div>
               </div>

               {/* Content */}
               <Content content={value} />

               {/* Tag */}
               <Tag tags={tags} />
            </div>
            <button className="popup-close" onClick={closePopup}>
               Close
            </button>
         </div>
      </div>
   );
};

export default Preview;
