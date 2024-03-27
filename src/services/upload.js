import axios from 'axios';

export async function uploadImageCloudinary(img) {
   const formData = new FormData();

   formData.append('file', img);
   formData.append('upload_preset', 'bob1b2wv');

   const response = await axios
      .post(
         'https://api.cloudinary.com/v1_1/vtruongcloudinary/image/upload',
         formData
      )
      .then((response) => {
         console.log('upload success');
         return response;
      })
      .catch((error) => {
         console.log('upload fail', error.message);
      });

   return response;
}
