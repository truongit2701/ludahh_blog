import React from 'react';
import { formatDDMMYYYYHHMM } from '../common';
import { useNavigate } from 'react-router-dom';

const Related = ({ listRelated }) => {
   const navigate = useNavigate();
   return (
      <div className="main_post_related">
         <h4>Liên quan</h4>

         <div className="list_related">
            {listRelated?.length > 0 ? (
               listRelated?.map((postItem) => {
                  return (
                     <div
                        className="related_item"
                        key={postItem.id}
                        onClick={() => navigate(`p/${postItem.id}`)}
                     >
                        <img
                           src={postItem.banner}
                           alt="most_view_post_img"
                           width={150}
                        />
                        <p>{postItem.title}</p>
                        <span>{formatDDMMYYYYHHMM(postItem.createdAt)}</span>
                        <h4>{postItem.userId.username}</h4>
                     </div>
                  );
               })
            ) : (
               <p>Không có bài viết liên quan</p>
            )}
         </div>
      </div>
   );
};

export default Related;
