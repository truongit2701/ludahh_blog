import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Error from '../components/common/Error';
import { fetchDetailPost } from '../services/post';
import '../style/main-post.css';
import Post from './Post';
import Loading from '../components/common/Loading';

const MainPost = () => {
   const { id } = useParams();
   const [detailPost, setDetailPost] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const auth = useSelector((state) => state.auth.login.user);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const detailPostData = await fetchDetailPost(id, auth?.id || 0);
            setDetailPost(detailPostData);
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
               <Post post={detailPost} setDetailPost={setDetailPost} />
            </div>
         </div>
      </div>
   );
};

export default MainPost;
