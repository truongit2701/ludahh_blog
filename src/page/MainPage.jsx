/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { GoComment } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { formatDDMMYYYYHHMM } from '../common';
import { fetchListPostMostView } from '../services/post';
import '../style/mainpage.css';
import Loading from '../components/Loading';
import Error from '../components/common/Error';
import { PAG_TAKE_BIGGEST } from '../common/enum';

const MainPage = () => {
   const navigate = useNavigate();
   const [currentPage, setCurrentPage] = useState(1);

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['post-most-view'],
      queryFn: () => fetchListPostMostView(currentPage, PAG_TAKE_BIGGEST),
      cacheTime: 5000,
   });

   useEffect(() => {
      refetch();

      return () => {};
   }, [currentPage, refetch]);

   if (isLoading) return <Loading />;

   if (error) return <Error />;

   const totalPages = data.meta.pageCount;

   // Logic chuyển đến trang khác
   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
      <>
         <div className="main_page">
            {/* <Helmet>
               <title>mmmmmmmmmm</title>
            </Helmet> */}
            <div>
               {data.data.map((post) => (
                  <div
                     key={post.id}
                     className="post_item"
                     onClick={() => navigate(`p/${post.id}`)}
                  >
                     <div className="post_item_img">
                        <img
                           src={post.banner}
                           alt="post_item_img"
                           width={60}
                           height={60}
                        />
                     </div>
                     <div className="post_item_top">
                        <div className="post_item_author">
                           {post.userId.username}
                        </div>

                        <div>{formatDDMMYYYYHHMM(post.createdAt)}</div>
                        <div className="post_item_title">{post.title}</div>

                        <div>
                           <FiEye />
                           <span style={{ marginRight: '5px' }}>
                              {post.view}
                           </span>

                           <GoComment />
                           <span>{post.comments.length}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* pagination */}
            <div className="pagination">
               {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
                     {i + 1}
                  </button>
               ))}
            </div>
         </div>
      </>
   );
};

export default MainPage;
