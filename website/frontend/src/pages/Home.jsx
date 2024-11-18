import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import QuestionList from './QuestionList';

function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-purple-200 min-h-screen">
      <Navbar setSearchResults={setSearchResults} setLoading={setLoading} />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">DSA Recommendation System</h1>
        <QuestionList searchResults={searchResults} loading={loading} />
      </div>
    </div>
  );
}

export default Home;
