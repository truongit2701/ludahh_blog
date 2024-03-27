import React from 'react';

const Tag = ({ tags }) => {
   return (
      <div className="main_post_tag">
         <div className="list_tag">
            {tags?.map((tag) => {
               return (
                  <span className="tag_item" key={tag.id}>
                     {tag.content}
                  </span>
               );
            })}
         </div>
      </div>
   );
};

export default Tag;
