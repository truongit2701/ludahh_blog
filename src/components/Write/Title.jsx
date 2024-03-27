import React from 'react';

const Title = ({ title, setTitle }) => {
   return (
      <div className="write_title">
         <span>- Tiêu đề bài:</span>
         <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />
      </div>
   );
};

export default Title;
