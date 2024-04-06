import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
   createComment,
   fetchChildComments,
   fetchComments,
   replyComment,
} from '../services/comment';
import '../style/comment.css';
import Loading from './Loading';
import { adjustTimeToLocal } from '../common';
import { PAG_TAKE_MINIMUN } from '../common/enum';
import Pagination from './common/Pagination';

const Comment = () => {
   const { id } = useParams();
   const [data, setData] = useState({});
   const [openChildCommentsId, setOpenChildCommentsId] = useState(null);
   const [listChildComment, setListChildComment] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [commentValue, setCommentValue] = useState('');
   const [commentChildValue, setCommentChildValue] = useState('');
   const auth = useSelector((state) => state.auth.login.user);

   // Tính toán số trang

   // handle comment
   const handleComment = async (e) => {
      e.preventDefault();
      if (!auth) return;
      if (!commentValue) return;

      await createComment(commentValue, id);

      setCommentValue('');

      // Fetch lại comments để cập nhật danh sách
      fetchCommentsAndUpdate();
   };

   const handleReplyComment = async (e) => {
      e.preventDefault();
      if (!commentChildValue) return;
      const response = await replyComment(
         commentChildValue,
         openChildCommentsId,
         id
      );

      setListChildComment([...listChildComment, response]);
      setCommentChildValue('');
   };

   // Logic chuyển đến trang khác
   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const toggleChildComments = async (commentId) => {
      setCommentChildValue('');
      setOpenChildCommentsId(commentId);
      if (!commentId) {
         setListChildComment([]);
         return;
      }
      const responseChildComments = await fetchChildComments(commentId);

      setListChildComment(responseChildComments);
   };

   // Tự động fetch comments khi component mount hoặc currentPage thay đổi
   useEffect(() => {
      fetchCommentsAndUpdate();
   }, [currentPage, id]);

   const fetchCommentsAndUpdate = async () => {
      const response = await fetchComments(id, currentPage, PAG_TAKE_MINIMUN);
      setData(response);
   };

   const totalPages = data.meta?.pageCount;

   if (Object.keys(data).length === 0) return <Loading />;
   const imageUrl = auth?.avatar ? auth?.avatar : '/images/avatar.jpg';
   return (
      <div className="main-post-comment">
         {auth && (
            <div className="box-comment">
               <form>
                  <div className="user-info">
                     <img
                        src={imageUrl}
                        className="user-img"
                        alt="avatar"
                        width={40}
                     />
                  </div>
                  <textarea
                     value={commentValue}
                     onChange={(e) => setCommentValue(e.target.value)}
                     rows={5}
                     placeholder="Viết bình luận..."
                     className="comment-input"
                  >
                     {' '}
                  </textarea>
               </form>
               <button className="btn save-btn" onClick={handleComment}>
                  Gửi
               </button>
            </div>
         )}
         <div className="list-comment">
            {data.data.map((comment) => {
               const avatarUser = comment.user?.avatar || '/images/avatar.jpg';
               return (
                  <div className="comment-item" key={comment.id}>
                     <div className="user-info">
                        <img
                           src={avatarUser}
                           className="user-img"
                           alt="avatar"
                           width={40}
                        />
                        <div className="user-fullname">
                           {comment.user.fullName || 'văn trường'}
                        </div>
                     </div>
                     <p className="comment-content">- {comment.content}</p>

                     <p className="comment-time">
                        {adjustTimeToLocal(comment.createdAt)}
                     </p>
                     <div className="comment_reply">
                        {openChildCommentsId !== comment.id ? (
                           <button
                              className="btn reply-btn"
                              onClick={() => toggleChildComments(comment.id)}
                           >
                              Xem phản hồi
                           </button>
                        ) : (
                           <>
                              {auth && (
                                 <form onSubmit={handleReplyComment}>
                                    <textarea
                                       cols="30"
                                       value={commentChildValue}
                                       rows="4"
                                       className="comment-input"
                                       onChange={(e) =>
                                          setCommentChildValue(e.target.value)
                                       }
                                    ></textarea>
                                    <div className="flex">
                                       <button
                                          className="btn cancel-btn"
                                          onClick={() =>
                                             toggleChildComments(null)
                                          }
                                       >
                                          Hủy
                                       </button>
                                       <button className="btn save-btn">
                                          Trả lời
                                       </button>
                                    </div>
                                 </form>
                              )}
                              <div className="list-child-comment">
                                 {/* Hiển thị danh sách comment con */}
                                 {listChildComment.length
                                    ? listChildComment.map((childComment) => (
                                         <div key={childComment.id}>
                                            <div className="user-info">
                                               <img
                                                  src={
                                                     childComment.user.avatar ||
                                                     '/images/avatar.jpg'
                                                  }
                                                  className="user-img"
                                                  alt="avatar"
                                                  width={40}
                                               />
                                               <div className="user-fullname">
                                                  {childComment.user.fullName ||
                                                     'văn trường'}
                                               </div>
                                            </div>
                                            <p className="comment-content">
                                               - {childComment.content}
                                            </p>
                                            <p className="comment-time">
                                               {adjustTimeToLocal(
                                                  childComment.createdAt
                                               )}
                                            </p>
                                         </div>
                                      ))
                                    : 'Chưa có phản hồi'}
                              </div>
                           </>
                        )}
                     </div>
                     {/* {comment?.countChildrenComment > 0 ? (
                        <div
                           className="box_reply"
                           onClick={() => toggleChildComments(comment.id)}
                        >
                           <div>
                              <button>phản hồi</button>
                           </div>

                           {openChildCommentsId === comment.id && (
                              <div className="list-child-comment">
                                 {listChildComment.map((childComment) => (
                                    <div key={childComment.id}>
                                       <p>- {childComment.content}</p>
                                       <p className="comment-author">
                                          {childComment.user.username}
                                       </p>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     ) : null} */}
                  </div>
               );
            })}
         </div>

         {/* <Pagination
            data={data.data}
            itemsPerPage={PAG_TAKE_MINIMUN}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
         /> */}

         {totalPages > 1 && (
            <div className="pagination">
               {Array.from({ length: totalPages }, (_, i) => (
                  <button
                     key={i + 1}
                     className={i + 1 === currentPage ? 'active' : ''}
                     onClick={() => handlePageChange(i + 1)}
                  >
                     {i + 1}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};

export default Comment;
