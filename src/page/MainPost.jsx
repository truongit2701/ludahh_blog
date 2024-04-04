import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MostViewPost from '../components/MostViewPost';
import Tag from '../components/Tag';
import { fetchDetailPost, fetchListPostMostView } from '../services/post';
import { getCategoryTag } from '../services/write';
import '../style/main-post.css';
import Post from './Post';
import { PAG_TAKE_BIGGEST } from '../common/enum';
import Error from '../components/common/Error';
import Loading from '../components/Loading';

const MainPost = () => {
   const { id } = useParams();
   const [detailPost, setDetailPost] = useState(null);
   const [listPostMostView, setListPostMostView] = useState([]);
   const [listTagCategory, setListTagCategory] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [detailPostData, mostViewData, tagCategoryData] =
               await Promise.all([
                  fetchDetailPost(id),
                  fetchListPostMostView(1, PAG_TAKE_BIGGEST),
                  getCategoryTag(),
               ]);
            setDetailPost(detailPostData);
            setListPostMostView(mostViewData.data);
            setListTagCategory(tagCategoryData);
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id]);

   if (loading) return <Loading />;

   if (error) return <Error />;

   return (
      <div className="main-post">
         <div className="content">
            <div className="new-post">
               <Post post={detailPost} />
            </div>

            {/* <div className="most_view-post">
               <h2 className="heading">Xem nhiều</h2>
               <div className="list_most_view">
                  {listPostMostView
                     .filter((post) => post.id !== +id)
                     .map((post) => (
                        <MostViewPost key={post.id} post={post} />
                     ))}
               </div>

               <div className="most_view_tag">
                  <h2 className="heading">Tag</h2>
                  <Tag tags={listTagCategory?.tag} />
               </div>

               <div className="most_view_category">
                  <h2 className="heading">Danh mục</h2>
                  <div>
                     {listTagCategory?.category?.map((category) => (
                        <li key={category.id}>{category.content}</li>
                     ))}
                  </div>
               </div>
            </div> */}
         </div>
      </div>
   );
};

export default MainPost;
