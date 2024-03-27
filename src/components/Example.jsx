import React, { useState, useMemo, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const Example = () => {
   const [value, setValue] = useState([
      {
         type: 'paragraph',
         children: [{ text: '' }],
      },
   ]);

   const editor = useMemo(() => withHistory(withReact(createEditor())), []);

   const handleChange = useCallback((newValue) => {
      setValue(newValue);
   }, []);

   return (
      <Slate editor={editor} value={value} onChange={handleChange}>
         <Editable />
      </Slate>
   );
};

export default Example;
