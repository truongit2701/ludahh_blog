import axios from '../customize/axios';

export async function fetchComments(id, currentPage, limit) {
   try {
      const response = await axios.get(
         `comment/${id}/list-comment?page=${currentPage}&take=${limit}`
      );

      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function fetchChildComments(parent_id) {
   try {
      const response = await axios.get(`comment/${parent_id}/child-comments`);

      return response.data;
   } catch (err) {}
}

export async function createComment(content, post_id) {
   try {
      const response = await axios.post('comment', { content, post_id });

      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function replyComment(content, parent_id, post_id) {
   try {
      const response = await axios.post('comment/reply', {
         content,
         parent_id,
         post_id,
      });

      return response.data;
   } catch (err) {
      throw err;
   }
}
