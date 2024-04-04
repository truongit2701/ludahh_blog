import React from 'react';
import { CiTimer } from 'react-icons/ci';
import { FiEye } from 'react-icons/fi';
import { GoComment, GoHeart } from 'react-icons/go';
import { IoPersonOutline } from 'react-icons/io5';
import { formatDDMMYYYYHHMM } from '../common';
import Comment from '../components/Comment';
import Content from '../components/Content';
import Related from '../components/Related';
import Tag from '../components/Tag';
import { Helmet } from 'react-helmet';
import { FaRegComment } from 'react-icons/fa6';

const Post = ({ post }) => {
   return (
      <>
         {/* <Helmet>
            <title>{post.title}</title>
         </Helmet> */}
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
                  <div className="icon">
                     <GoHeart />
                  </div>
                  <span>{post.view}</span>
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
