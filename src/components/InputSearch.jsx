// components/InputSearch.js
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';

const InputSearch = ({ value, onChange, showInput, toggleInput }) => {
   return (
      <div className={`input-container ${showInput ? 'flex-1' : ''}`}>
         <div className={`input-parent ${showInput ? 'show' : 'none'}`}>
            <input
               type="text"
               placeholder="Tìm kiếm.."
               className="input-search"
               value={value}
               onChange={onChange}
            />
         </div>
         <div className="icon" onClick={toggleInput}>
            {showInput ? <FaTimes /> : <IoSearchOutline />}
         </div>
      </div>
   );
};

export default InputSearch;
