import axios from '../customize/axios';

export async function createPost({
   title,
   banner,
   categoryId,
   tags,
   content,
   setError,
}) {
   try {
      const response = await axios.post('post', {
         title,
         banner,
         categoryId,
         tags,
         content,
      });

      return response;
   } catch (err) {
      setError(err.message);
   }
}

export async function getCategoryTag() {
   try {
      const response = await axios.get('category');
      return response.data;
   } catch (err) {
      throw err;
   }
}
