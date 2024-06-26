import React from 'react';

const Pagination = ({ data, itemsPerPage, handlePageChange, currentPage }) => {
   console.log(
      '♥️ ~ Pagination ~ data:',
      data.length,
      Math.ceil(data.length / itemsPerPage)
   );
   return (
      <div className="pagination">
         {Array.from(
            { length: Math.ceil(data.length / itemsPerPage) },
            (_, index) => (
               <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={index + 1 === currentPage ? 'active' : ''}
               >
                  {index + 1}
               </button>
            )
         )}
      </div>
   );
};

export default Pagination;
