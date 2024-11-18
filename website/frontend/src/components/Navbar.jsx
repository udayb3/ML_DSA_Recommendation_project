import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { getSearchedQuestions, getQuestion } from '../api/questions';

function Navbar({ setSearchResults, setLoading }) {
  const logout = useLogout();
  const { user } = useAuthContext();
  const [search, setSearch] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const questions = await getSearchedQuestions(search);
      const data = questions.SearchedQuestions;
      const finalData = [];
      for (const key in data.check) {
        const q = await getQuestion(parseInt(key));
        finalData.push(q.question);
      };
      setSearchResults(finalData);
    } catch (err) {
      console.error('Failed to search questions: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setSearchResults(null);
    setSearch('');
  };

  return (
    <nav className="bg-purple-700 p-4 flex justify-between items-center text-white">
      <Link to="/" onClick={handleClick} className='text-2xl font-bold'>LeetForce</Link>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md text-black focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className='bg-purple-500 hover:bg-purple-600 py-[0.4rem] px-[0.7rem] rounded-md'
          disabled={search === ''}
        >
          {search ? 'Search' : 'Enter a query'}
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-md">
          Welcome, {user && user.success ? user.user.username : 'User'}
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-md" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
