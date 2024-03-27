import React, { useRef, useState } from 'react';
import { uploadImageCloudinary } from '../../services/upload';

const Banner = ({ banner, setBanner }) => {
   const [imageReview, setImageReview] = useState(null);
   /**
    * upload handle
    */
   const fileInputRef = useRef(null);
   const handleUploadBanner = async (e) => {
      setImageReview(e.target.files[0]);
      const response = await uploadImageCloudinary(e.target.files[0]);
      setBanner(response.data.url);
      console.log('♥️ ~ handleUploadBanner ~ response:', response.data.url);
   };
   return (
      <div className="write_banner">
         <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleUploadBanner}
         />
         <button onClick={() => fileInputRef.current.click()}>
            Chọn banner
         </button>

         <>
            {banner === '' ? (
               'banner preview'
            ) : (
               <img
                  src={banner !== '' ? URL.createObjectURL(imageReview) : ''}
                  alt="banner"
                  width={300}
                  height={200}
               />
            )}
         </>
      </div>
   );
};

export default Banner;
