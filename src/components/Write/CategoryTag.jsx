import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCategoryTag } from '../../services/write';
import Category from './Category';
import TagList from './Tag';

const CategoryTag = ({ tags, setTags, setCategoryId }) => {
   const { isLoading, error, data } = useQuery({
      queryKey: ['category-tag'],
      queryFn: getCategoryTag,
   });

   if (isLoading) return 'Loading...';

   if (error) return 'An error has occurred: ' + error.message;
   return (
      <>
         {/* category list */}
         <Category setCategoryId={setCategoryId} listCategory={data.category} />

         {/* tag list */}
         <TagList tags={tags} setTags={setTags} listTag={data.tag} />
      </>
   );
};

export default CategoryTag;
