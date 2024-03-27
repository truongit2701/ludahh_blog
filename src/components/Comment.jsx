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

   return (
      <div className="main_post_comment">
         {auth && (
            <form className="box_comment" onSubmit={handleComment}>
               <textarea
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
               >
                  {' '}
               </textarea>
               <button type="submit">gửi</button>
            </form>
         )}
         <div className="list_comment">
            {data.data.map((comment) => {
               return (
                  <div className="comment_item" key={comment.id}>
                     <p>- {comment.content}</p>
                     <p className="comment_author">{comment?.user.username}</p>
                     <p className="comment_time">
                        {adjustTimeToLocal(comment.createdAt)}
                     </p>
                     <div className="comment_reply">
                        {openChildCommentsId !== comment.id ? (
                           <button
                              onClick={() => toggleChildComments(comment.id)}
                           >
                              Phản hồi
                           </button>
                        ) : (
                           <>
                              <button onClick={() => toggleChildComments(null)}>
                                 Hủy
                              </button>
                              {auth && (
                                 <form
                                    action=""
                                    className="comment_reply_form"
                                    onSubmit={handleReplyComment}
                                 >
                                    <textarea
                                       cols="30"
                                       value={commentChildValue}
                                       rows="3"
                                       onChange={(e) =>
                                          setCommentChildValue(e.target.value)
                                       }
                                    ></textarea>
                                    <button>gửi</button>
                                 </form>
                              )}
                              <div className="list_child_comment">
                                 {/* Hiển thị danh sách comment con */}
                                 {listChildComment.length
                                    ? listChildComment.map((childComment) => (
                                         <div key={childComment.id}>
                                            <p>- {childComment.content}</p>
                                            <p className="comment_author">
                                               {childComment.user.username}
                                            </p>
                                            <p className="comment_time">
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
                              <div className="list_child_comment">
                                 {listChildComment.map((childComment) => (
                                    <div key={childComment.id}>
                                       <p>- {childComment.content}</p>
                                       <p className="comment_author">
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
         <div>
            {/* Nút điều hướng */}
            {Array.from({ length: totalPages }, (_, i) => (
               <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
               </button>
            ))}
         </div>
      </div>
   );
};

export default Comment;
