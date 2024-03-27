import React from 'react';
import { CiTimer } from 'react-icons/ci';
import { FiEye } from 'react-icons/fi';
import { GoComment } from 'react-icons/go';
import { IoPersonOutline } from 'react-icons/io5';
import { formatDDMMYYYYHHMM } from '../common';
import Comment from '../components/Comment';
import Content from '../components/Content';
import Related from '../components/Related';
import Tag from '../components/Tag';
import { Helmet } from 'react-helmet';

const Post = ({ post }) => {
   return (
      <>
         {/* <Helmet>
            <title>{post.title}</title>
         </Helmet> */}
         <div className="main_post">
            <div className="main_post_banner">
               <img src={post.banner} alt="most_view_post_img" />
               <div className="main_post_heading">
                  <li className="main_post_category">
                     {post.categoryId?.content}
                  </li>
                  <p className="main_post_title">{post.title}</p>
                  <div>
                     <p>
                        <CiTimer />
                        <span>{formatDDMMYYYYHHMM(post.createdAt)}</span>
                     </p>
                     <p>
                        <GoComment />
                        <span>{post.comments.length}</span>
                     </p>
                     <p>
                        <IoPersonOutline />
                        <span>{post.userId?.username}</span>
                     </p>
                     <p>
                        <FiEye />
                        <span>{post.view}</span>
                     </p>
                  </div>
               </div>
            </div>

            {/* Content */}
            <Content content={post?.content} />

            {/* Tag */}
            <Tag tags={post.tags} />

            {/* related */}
            <Related listRelated={post.relatedPosts} />

            {/* Comment */}
            <Comment />
         </div>
      </>
   );
};

export default Post;
