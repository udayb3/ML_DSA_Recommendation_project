import React from 'react';
import Navbar from './Navbar';
import QuestionList from './QuestionList';

function Home() {
  return (
    <div className="bg-purple-200 min-h-screen">
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">DSA Recommendation System</h1>
        <QuestionList />
      </div>
    </div>
  );
}

export default Home;
