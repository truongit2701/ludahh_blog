import React from 'react';
import '../style/loading.css';

const Loading = () => {
   return (
      <div className="lds-ring-container">
         <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   );
};

export default Loading;
