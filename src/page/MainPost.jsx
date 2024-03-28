import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Import useQuery từ @tanstack/react-query
import MostViewPost from '../components/MostViewPost';
import Tag from '../components/Tag';
import { fetchDetailPost, fetchListPostMostView } from '../services/post';
import { getCategoryTag } from '../services/write';
import '../style/mainpage.css';
import Post from './Post';
import { PAG_TAKE_BIGGEST } from '../common/enum';
import Error from '../components/common/Error';

const MainPost = () => {
   const { id } = useParams();

   const {
      isLoading: postLoading,
      error: detailPostError,
      data: detailPost,
   } = useQuery({
      queryKey: ['detailPost', id],
      queryFn: () => fetchDetailPost(id),
   });

   const {
      isLoading: mostViewLoading,
      error: mostViewLoadingError,
      data: listPostMostView,
   } = useQuery({
      queryKey: ['listPostMostView'],
      queryFn: () => fetchListPostMostView(1, PAG_TAKE_BIGGEST),
   });

   const {
      isLoading: tagCategoryLoading,
      error: tagCategoryLoadingError,
      data: listTagCategory,
   } = useQuery({
      queryKey: ['listTagCategory'],
      queryFn: getCategoryTag,
   });
   if (detailPostError || mostViewLoadingError || tagCategoryLoadingError)
      return <Error />;

   return (
      <div>
         <div className="content">
            <div className="new_post">
               {/* Kiểm tra nếu dữ liệu đang tải hoặc chưa được tải */}
               {postLoading ? (
                  <div>Loading...</div>
               ) : (
                  <Post post={detailPost} />
               )}
            </div>

            <div className="most_view_post">
               <h2 className="heading">Xem nhiều</h2>
               <div className="list_most_view">
                  {/* Kiểm tra nếu dữ liệu đang tải hoặc chưa được tải */}
                  {mostViewLoading ? (
                     <div>Loading...</div>
                  ) : (
                     listPostMostView.data
                        .filter((post) => post.id !== +id)
                        .map((post) => (
                           <MostViewPost key={post.id} post={post} />
                        ))
                  )}
               </div>

               {/* list tag */}
               <div className="most_view_tag">
                  <h2 className="heading">Tag</h2>
                  {/* Kiểm tra nếu dữ liệu đang tải hoặc chưa được tải */}
                  {tagCategoryLoading ? (
                     <div>Loading...</div>
                  ) : (
                     <Tag tags={listTagCategory?.tag} />
                  )}
               </div>

               {/* list category */}
               <div className="most_view_category">
                  <h2 className="heading">Danh mục</h2>
                  <div>
                     {/* Kiểm tra nếu dữ liệu đang tải hoặc chưa được tải */}
                     {tagCategoryLoading ? (
                        <div>Loading...</div>
                     ) : (
                        listTagCategory?.category?.map((category) => (
                           <li key={category.id}>{category.content}</li>
                        ))
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MainPost;
