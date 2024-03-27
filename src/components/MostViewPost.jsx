import React from 'react';
import dayjs from 'dayjs';
import { FiEye } from 'react-icons/fi';
import { GoComment } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { formatDDMMYYYYHHMM } from '../common';

const MostViewPost = ({ post }) => {
   const navigate = useNavigate();
   return (
      <div className="most_view_item" onClick={() => navigate(`/${post.id}`)}>
         <img
            src={post.banner}
            width={70}
            height={70}
            alt="most_view_post_img"
         />

         <div>
            <p className="most_view_item_title">{post.title}</p>

            <p>
               <FiEye />
               <span style={{ marginRight: '5px' }}>{post.view}</span>

               <GoComment />
               <span>{post.comments.length}</span>
            </p>
            <p className="most_view_item_createdAt">
               {formatDDMMYYYYHHMM(post.createdAt)}
            </p>
            <p className="most_view_item_author">{post.userId.username}</p>
         </div>
      </div>
   );
};

export default MostViewPost;
