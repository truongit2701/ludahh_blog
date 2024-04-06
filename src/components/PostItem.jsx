import React from 'react';
import { formatMonthDay } from '../common';
import { FiEye } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ post }) => {
   const navigate = useNavigate();

   const getContent = (data) => {
      const content = { __html: data };
      return content;
   };
   return (
      <div className="post-item">
         <div
            className="post-item-left"
            onClick={() => navigate(`/p/${post.id}`)}
         >
            <div className="post-item-title">{post.title}</div>
            <div
               className="post-item-content"
               dangerouslySetInnerHTML={getContent(post.content)}
            ></div>

            <div className="post-item-description">
               <div className="post-item-author">{post.userId.username}</div>•
               <div className="post-item-createdDate">
                  {formatMonthDay(post.createdAt)}
               </div>
            </div>

            <div className="post-item-icons">
               <div>
                  <div className="icon">
                     <FiEye />
                  </div>
                  <span>{post.view}</span>
               </div>
               <div>
                  <div className="icon">
                     <GoHeart />
                  </div>
                  <span>{post.total_like}</span>
               </div>

               <div>
                  <div className="icon">
                     <FaRegComment />
                  </div>
                  <span>{post.comments.length}</span>
               </div>
            </div>
         </div>
         <div className="post-item-right">
            <div className="post-item-img">
               <img src={post.banner} alt="post-item-img" width={'100%'} />
            </div>
         </div>
      </div>
   );
};

export default PostItem;
