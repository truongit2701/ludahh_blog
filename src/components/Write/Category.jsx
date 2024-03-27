import React from 'react';

const Category = ({ setCategoryId, listCategory }) => {
   return (
      <div className="write_category">
         <span>- Danh mục:</span>
         <select onChange={(e) => setCategoryId(e.target.value)}>
            <option value="0_Không">Không</option>
            {listCategory.map((category) => (
               <option
                  key={category.id}
                  value={`${category.id}_${category.content}`}
               >
                  {category.content}
               </option>
            ))}
         </select>
      </div>
   );
};

export default Category;
