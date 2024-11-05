import React from 'react';
import Question from '../components/Question';

const questions = [
  {
    id: 1,
    name: 'Binary Search',
    link: 'https://leetcode.com/problems/',
    difficulty: 'Medium',
    upvotes: 120,
    downvotes: 10,
    solved: false,
    totalSubmissions: 500, 
  },
];


function QuestionList() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </div>
  );
}

export default QuestionList;
