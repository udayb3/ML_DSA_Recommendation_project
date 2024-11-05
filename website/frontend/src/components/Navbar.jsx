import React from 'react';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  const logout = useLogout()
  const { user } = useAuthContext();
  return (
    <nav className="bg-purple-700 p-4 flex justify-between items-center text-white">
      <div className='text-2xl font-bold'>LeetForce</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-md text-black focus:outline-none"
        />
      </div> 
      <div className="flex items-center space-x-4">
        <button className="bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-md">
          Welcome, {user.user.userName}
          {/* Profile */}
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-md" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
