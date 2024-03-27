import React, { useEffect, useState } from 'react';
import { PiPencilSimpleLight } from 'react-icons/pi';
import { fetchUser } from '../../services/auth';

const User = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      async function fetch() {
         const response = await fetchUser();
         setUsers(response);
      }

      fetch();
   }, []);
   return (
      <div>
         {users.map((user) => (
            <p key={user.id}>
               {user.username} |{user.isAdmin ? 'admin' : 'user'} |{' '}
               <button>
                  <PiPencilSimpleLight />
               </button>{' '}
               <button>x</button>
            </p>
         ))}
      </div>
   );
};

export default User;
