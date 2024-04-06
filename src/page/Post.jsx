import React from 'react';
import { FaRegComment } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoPersonOutline } from 'react-icons/io5';
import { formatDDMMYYYYHHMM } from '../common';
import Comment from '../components/Comment';
import Content from '../components/Content';
import Tag from '../components/Tag';
import { reaction } from '../services/post';
import { useSelector } from 'react-redux';

const Post = ({ post, setDetailPost }) => {
   const auth = useSelector((state) => state.auth.login.user);
   const handleReaction = async (type) => {
      if (!auth) return;
      setDetailPost((prevPost) => ({
         ...prevPost,
         is_like: Number(!type),
         total_like: !type ? prevPost.total_like + 1 : prevPost.total_like - 1,
      }));
      await reaction(post.id);
   };

   return (
      <>
         <div className="main-post-banner">
            <div className="main-post-title">{post.title}</div>
            <li className="main-post-category">{post.categoryId?.content}</li>
            <div className="main-post-author">
               <div className="icon">
                  <IoPersonOutline />
               </div>
               <span>{post.userId?.username}</span>•
               <span>{formatDDMMYYYYHHMM(post.createdAt)}</span>
            </div>
            <div className="main-post-img">
               <img src={post.banner} alt="most-view-post-img" />
            </div>
            <div className="main-post-icons">
               <div>
                  <div className="icon">
                     <FiEye />
                  </div>
                  <span>{post.view}</span>
               </div>
               <div>
                  <div
                     className="icon"
                     onClick={() => handleReaction(post.is_like)}
                  >
                     {post.is_like ? (
                        <GoHeartFill color="deeppink" />
                     ) : (
                        <GoHeart />
                     )}
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

         {/* Content */}
         <Content content={post?.content} />

         {/* Tag */}
         <Tag tags={post.tags} />

         {/* related */}
         {/* <Related listRelated={post.relatedPosts} /> */}

         {/* Comment */}
         <Comment />
      </>
   );
};

export default Post;
