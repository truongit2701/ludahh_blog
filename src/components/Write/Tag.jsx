import React, { useState } from 'react';

const TagList = ({ tags, setTags, listTag }) => {
   const [searchTag, setSearchTag] = useState('');

   /**
    * tag handle
    * */

   const handleTagClick = (tag) => {
      const existTag = tags.find((tagItem) => tagItem.id === tag.id);
      if (existTag) {
         setTags(tags.filter((l) => l.id !== tag.id));
      } else {
         setTags([...tags, tag]);
      }
   };

   const handleSearchTag = (event) => {
      setSearchTag(event.target.value);
   };

   const filteredTags = listTag.filter((tag) =>
      tag.content.toLowerCase().includes(searchTag.toLowerCase())
   );

   return (
      <div className="write_tag">
         <div>
            <span>- Tag:</span>
            <input
               type="text"
               placeholder="search tag"
               className="write-input"
               value={searchTag}
               onChange={handleSearchTag}
            />
            <br />
            {filteredTags.map((tag) => (
               <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag)}
                  className={`write-tag ${
                     tags.find((tagItem) => tagItem.id === tag.id)
                        ? 'tag-active'
                        : ''
                  }`}
               >
                  {tag.content}
               </button>
            ))}
         </div>
      </div>
   );
};

export default TagList;
