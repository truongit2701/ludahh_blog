import React, { useEffect, useState } from 'react';
import { getCategoryTag } from '../services/write';

const Category = () => {
   const [tags, setTags] = useState([]);
   const [categorys, setCategorys] = useState([]);
   const [newTag, setNewTag] = useState('');
   const [newCategory, setNewCategory] = useState('');

   useEffect(() => {
      async function fetch() {
         const response = await getCategoryTag();
         setCategorys(response.category);
         setTags(response.tag);
      }

      fetch();
   }, []);

   /**
    * handle tag
    * */
   const handleAddNewTag = (e) => {
      setNewTag(e.target.value);
   };

   const handleAddNewTagKeyDown = (event) => {
      if (event.key === 'Enter') {
         addNewTag();
      }
   };

   const addNewTag = () => {
      if (newTag.trim() === '') return;

      if (tags.find((tag) => tag.content === newTag)) return;
      setTags([...tags, { content: newTag.trim(), id: Math.random() }]);
      setNewTag('');
   };

   const handleRemoveTag = (id) => {
      setTags(tags.filter((tag) => tag.id !== id));
   };

   /**
    * handle category
    * */
   const handleAddNewCategory = (e) => {
      setNewCategory(e.target.value);
   };

   const handleAddNewCategoryKeyDown = (event) => {
      if (event.key === 'Enter') {
         addNewCategory();
      }
   };

   const addNewCategory = () => {
      if (newCategory.trim() === '') return;

      if (categorys.find((category) => category.content === newCategory))
         return;
      setCategorys([
         ...categorys,
         { content: newCategory.trim(), id: Math.random() },
      ]);
      setNewCategory('');
   };

   const handleRemoveCategory = (id) => {
      setCategorys(categorys.filter((tag) => tag.id !== id));
   };
   return (
      <div className="category_tag">
         <div className="tag">
            <h5>Danh sách thẻ tag</h5>

            <div>
               <input
                  type="text"
                  placeholder="new tag"
                  onChange={handleAddNewTag}
                  onKeyDown={handleAddNewTagKeyDown}
                  value={newTag}
               />
               <button onClick={handleAddNewTagKeyDown}>Thêm</button>
            </div>
            {tags.map((tag) => (
               <button key={tag.id}>
                  {tag.content}{' '}
                  <span onClick={() => handleRemoveTag(tag.id)}>x</span>
               </button>
            ))}
         </div>

         <div className="category">
            <h5>Danh sách danh mục</h5>

            <div>
               <input
                  type="text"
                  placeholder="new category"
                  onChange={handleAddNewCategory}
                  onKeyDown={handleAddNewCategoryKeyDown}
                  value={newCategory}
               />
               <button onClick={handleAddNewCategoryKeyDown}>Thêm</button>
            </div>

            <ul>
               {categorys.map((c) => (
                  <li key={c.id}>
                     {c.content}{' '}
                     <button onClick={() => handleRemoveCategory(c.id)}>
                        x
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Category;
