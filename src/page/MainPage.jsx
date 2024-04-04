/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { formatMonthDay } from '../common';
import { PAG_TAKE_BIGGEST } from '../common/enum';
import Loading from '../components/Loading';
import Error from '../components/common/Error';
import { fetchListPostMostView } from '../services/post';
import '../style/mainpage.css';

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

   const getContent = (data) => {
      const content = { __html: data };
      return content;
   };

   return (
      <>
         <div className="main-page">
            {/* <Helmet>
               <title>mmmmmmmmmm</title>
            </Helmet> */}
            <div className="content">
               <div className="category">
                  <div className="category-tag active">New</div>

                  <div className="category-tag">Top</div>
               </div>
               <div className="post-container">
                  {data.data.map((post) => (
                     <div key={post.id} className="post-item">
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
                              <div className="post-item-author">
                                 {post.userId.username}
                              </div>
                              •
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
                        <div className="post-item-right">
                           <div className="post-item-img">
                              <img
                                 src={post.banner}
                                 alt="post-item-img"
                                 width={'100%'}
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* pagination */}
               {data.meta.page < 1 && (
                  <div className="pagination">
                     {Array.from({ length: totalPages }, (_, i) => (
                        <button
                           key={i + 1}
                           onClick={() => handlePageChange(i + 1)}
                        >
                           {i + 1}
                        </button>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default MainPage;
