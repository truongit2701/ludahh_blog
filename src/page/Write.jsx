import React, { Fragment, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Preview from '../components/Preview';
import Banner from '../components/Write/Banner';
import CategoryTag from '../components/Write/CategoryTag';
import Editor from '../components/Write/Editor';
import Title from '../components/Write/Title';
import { createPost } from '../services/write';
import '../style/write.css';
import { toast } from 'react-toastify';

const Write = () => {
   const [value, setValue] = useState('');
   const [isOpen, setIsOpen] = useState(false);
   const [banner, setBanner] = useState('');
   const [title, setTitle] = useState('');
   const [categoryId, setCategoryId] = useState(null);
   const [tags, setTags] = useState([]);
   const [error, setError] = useState('');
   /**
    * editor handle
    * */

   const handleEditorChange = (value) => {
      setValue(value);
   };

   const openPopup = () => {
      setIsOpen(true);
   };

   const closePopup = () => {
      setIsOpen(false);
   };

   /**
    * create post
    * */

   const handleCreatePost = async () => {
      if (!categoryId) {
         setError('Category not found');
         return;
      }
      const response = await createPost({
         content: value,
         banner,
         title,
         categoryId: categoryId.split('_')[0],
         tags,
         setError,
      });
      if (response.status === 200) {
         toast('🦄 Tạo bài thành công!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
         });
         clearData();
      }
   };

   // clearData
   const clearData = () => {
      setValue('');
      setBanner('');
      setTitle('');
      setCategoryId(null);
      setTags([]);
      setError('');
   };

   return (
      <Fragment>
         <div className="write">
            <button className="text-error" onClick={clearData}>
               Clear data
            </button>
            <div className="write_button_preview">
               <button onClick={openPopup}>preview</button>

               {isOpen && (
                  <Preview
                     closePopup={closePopup}
                     value={value}
                     isOpen={isOpen}
                     title={title}
                     banner={banner}
                     tags={tags}
                     categoryId={categoryId}
                  />
               )}
            </div>

            <div className="write_form">
               {error !== '' ? <p className="text-error">{error}</p> : null}
               {/* banner */}
               <Banner banner={banner} setBanner={setBanner} />

               {/* title */}
               <Title title={title} setTitle={setTitle} />

               {/* category tag */}
               <CategoryTag
                  tags={tags}
                  setTags={setTags}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
               />

               {/* editor */}
               <Editor handleEditorChange={handleEditorChange} value={value} />
            </div>

            <button onClick={handleCreatePost}>Tạo bài</button>
         </div>
      </Fragment>
   );
};

export default Write;
