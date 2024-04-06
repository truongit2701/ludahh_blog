// components/CategoryTag.js
import React from 'react';

const CategoryTag = ({ type, activeType, onClick }) => {
   return (
      <div
         className={`category-tag ${type === activeType ? 'active' : ''}`}
         onClick={() => onClick(type)}
      >
         {type}
      </div>
   );
};

export default CategoryTag;
