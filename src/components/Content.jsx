import React from 'react';
const Content = ({ content }) => {
   content = { __html: content };
   return (
      <div
         className="main-post_content view ql-editor"
         dangerouslySetInnerHTML={content}
      ></div>
   );
};

export default Content;
