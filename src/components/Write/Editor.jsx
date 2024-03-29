import React, { useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { uploadImageCloudinary } from '../../services/upload';

const Editor = ({ handleEditorChange, value, reactQuillRef }) => {
   // Quill.register('modules/imageResize', ImageResize);

   // const imageHandler = useCallback(() => {
   //    const input = document.createElement('input');
   //    input.setAttribute('type', 'file');
   //    input.setAttribute('accept', 'image/*');
   //    input.click();
   //    input.onchange = async () => {
   //       if (input !== null && input.files !== null) {
   //          const file = input.files[0];
   //          console.log('♥️ ~ input.onchange= ~ file:', file);
   //          const data = await uploadImageCloudinary(file);
   //          const quill = reactQuillRef.current;
   //          if (quill) {
   //             const range = quill.getEditorSelection();
   //             range &&
   //                quill
   //                   .getEditor()
   //                   .insertEmbed(range.index, 'image', data.data.url);
   //          }
   //       }
   //    };
   // }, []);
   const modules = {
      toolbar: {
         container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['image'],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
               { list: 'ordered' },
               { list: 'bullet' },
               { indent: '-1' },
               { indent: '+1' },
            ],
            ['link'],
            ['clean'],
            ['code-block'],
            ['code'],
         ],
         // handlers: {
         //    image: imageHandler, // <-
         // },
         // clipboard: {
         //    matchVisual: false,
         // },
      },
      // imageResize: {
      //    parchment: Quill.import('parchment'),
      //    modules: ['Resize', 'DisplaySize', 'Toolbar'],
      // },
   };

   // Định dạng được hỗ trợ
   const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'code-block',
      'image',
      'color',
      'video',
      'align',
      'code',
      'direction',
   ];
   return (
      <div className="write_editor abc">
         <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={handleEditorChange}
         />
      </div>
   );
};

export default Editor;
