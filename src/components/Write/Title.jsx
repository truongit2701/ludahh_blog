import React from 'react';

const Title = ({ title, setTitle }) => {
   return (
      <div>
         <span>- Tiêu đề bài:</span>
         <input
            className="write-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />
      </div>
   );
};

export default Title;
