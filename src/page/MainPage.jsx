/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { saveLocalStorage } from '../common';
import { STORAGE_KEY } from '../common/enum';
import CategoryTag from '../components/CategoryTag';
import InputSearch from '../components/InputSearch';
import PostItem from '../components/PostItem';
import { fetchListPost } from '../services/post';
import '../style/mainpage.css';
import Pagination from '../components/common/Pagination';
import Loading from '../components/common/Loading';

const MainPage = () => {
   const [isFetching, setIsFetching] = useState(false);
   const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredPosts, setFilteredPosts] = useState([]);
   const [showPosts, setShowPosts] = useState('category');

   const [postType, setPostType] = useState('new');

   const [showInput, setShowInput] = useState(false);

   useEffect(() => {
      setIsFetching(true);

      async function fetchData() {
         const listPost = await fetchListPost();
         setPosts(listPost);
         setFilteredPosts(listPost);
         saveLocalStorage(STORAGE_KEY.LIST_POST, listPost);
      }
      fetchData().then(() => setIsFetching(false));
   }, []);

   if (isFetching) return <Loading />;

   const itemsPerPage = 3;
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;

   const handleSearch = (event) => {
      const keyword = event.target.value;
      setSearchTerm(keyword);
      const filtered = posts.filter(
         (post) =>
            post.title.toLowerCase().includes(keyword.toLowerCase()) ||
            post.content.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredPosts(filtered);
   };

   const sortedPosts = posts.slice().sort((a, b) => {
      if (postType === 'new') {
         return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (postType === 'top') {
         return b.view - a.view;
      }
      return 0;
   });

   const currentData = sortedPosts.slice(startIndex, endIndex);

   // Logic chuyển đến trang khác
   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const toggleInput = () => {
      setShowInput(!showInput);
      const newShowPosts = showPosts === 'category' ? 'search' : 'category';
      setShowPosts(newShowPosts);
   };

   const data = showPosts === 'category' ? currentData : filteredPosts;
   return (
      <>
         <div className="main-page">
            {/* <Helmet>
               <title>mmmmmmmmmm</title>
            </Helmet> */}
            <div className="content">
               <div className="category">
                  <div className={`type-container ${showInput ? 'none' : ''}`}>
                     <CategoryTag
                        type="new"
                        activeType={postType}
                        onClick={setPostType}
                     />
                     <CategoryTag
                        type="top"
                        activeType={postType}
                        onClick={setPostType}
                     />
                  </div>
                  <InputSearch
                     value={searchTerm}
                     onChange={handleSearch}
                     showInput={showInput}
                     toggleInput={toggleInput}
                  />
               </div>

               <div className="post-container">
                  {data.map((post) => (
                     <PostItem key={post.id} post={post} />
                  ))}
               </div>

               {/* pagination */}
               {showPosts === 'category' ? (
                  <Pagination
                     data={posts}
                     itemsPerPage={itemsPerPage}
                     currentPage={currentPage}
                     handlePageChange={handlePageChange}
                  />
               ) : null}
            </div>
         </div>
      </>
   );
};

export default MainPage;
