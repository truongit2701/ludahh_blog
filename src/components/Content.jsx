import React from 'react';
const Content = ({ content }) => {
   content = { __html: content };
   return (
      <div
         className="main_post_content view ql-editor"
         dangerouslySetInnerHTML={content}
      ></div>
   );
};

export default Content;
