import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchAllPost, turnOffPost } from '../../services/post';
import '../../style/common.css';
import Loading from '../../components/common/Loading';

const PostManage = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [posts, setPosts] = useState([]);

   const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['list-post-manage'],
      queryFn: () => fetchAllPost(currentPage, 10),
   });

   useEffect(() => {
      if (!isLoading && !error) {
         setPosts(data.data);
      }
   }, [data, isLoading, error]);

   useEffect(() => {
      refetch();
   }, [currentPage, refetch]);

   if (isLoading) return <Loading />;

   if (error) return 'Some thing went wrong';

   const totalPages = data.meta.pageCount;
   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

   const handleChangeStatus = async (postId) => {
      const updatedPosts = posts.map((post) => {
         if (post.id === postId) {
            // Chuyển đổi trạng thái của bài đăng
            post.status = !post.status;
         }
         return post;
      });
      setPosts(updatedPosts);
      await turnOffPost(postId);
   };
   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th>STT</th>
                  <th>Tiêu đề</th>
                  <th>Tác giả</th>
                  <th>View</th>
                  <th>Nội dung</th>
                  <th>Trạng thái</th>
               </tr>
            </thead>
            <tbody>
               {posts.map((post) => (
                  <tr key={post.id}>
                     <td>{post.id}</td>
                     <td>{post.title}</td>
                     <td>{post.userId.username}</td>
                     <td>{post.view}</td>
                     <td className="content">{post.content}</td>
                     <td onClick={() => handleChangeStatus(post.id)}>
                        {!post.status ? (
                           <button>Bật</button>
                        ) : (
                           <button>Tắt</button>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {/* pagination */}
         {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
               {i + 1}
            </button>
         ))}
      </div>
   );
};

export default PostManage;
