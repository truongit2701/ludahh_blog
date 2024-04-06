import { toast } from 'react-toastify';
import axios from '../customize/axios';

export async function fetchListPost(currentPage, take) {
   try {
      const response = await axios.get(`post`);
      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function fetchListPostMostView(currentPage, take) {
   try {
      const response = await axios.get(`post?page=${currentPage}&take=${take}`);
      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function fetchAllPost(currentPage, take) {
   try {
      const response = await axios.get(
         `post/manage?page=${currentPage}&take=${take}`
      );
      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function fetchDetailPost(id, user_id) {
   try {
      const response = await axios.get(`post/${id}/detail?user_id=${user_id}`);

      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function turnOffPost(id) {
   try {
      const response = await axios.post(`post/${id}/turn-off`);
      if (response.status === 200) {
         toast('🦄 Thao tác thành công!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
         });
      }
      return response.data;
   } catch (err) {
      throw err;
   }
}

export async function reaction(id) {
   try {
      const response = await axios.post(`reaction`, { post_id: id });

      return response.data;
   } catch (err) {
      throw err;
   }
}
