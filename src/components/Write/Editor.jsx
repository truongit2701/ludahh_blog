import React from 'react';
import ReactQuill from 'react-quill';

const Editor = ({ handleEditorChange, value }) => {
   const modules = {
      toolbar: [
         [{ header: '1' }, { header: '2' }, { font: [] }],
         [{ size: [] }],
         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
         [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
         ],
         ['link'],
         ['clean'],
         ['code-block'], // Thêm tùy chọn chèn mã vào trình soạn thảo
      ],
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
   ];
   return (
      <div className="write_editor">
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
