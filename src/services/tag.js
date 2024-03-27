import axios from '../customize/axios';

export async function fetchListTag() {
   try {
      const response = await axios.get('category');
      return response;
   } catch (err) {
      console.log('♥️ ~ fetchListTag ~ err:', err);
   }
}
