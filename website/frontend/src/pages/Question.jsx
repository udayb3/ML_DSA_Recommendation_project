import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaClipboard } from 'react-icons/fa';

function Question({ name, link, difficulty, upvotes, downvotes, solved, totalSubmissions }) {
  const [note, setNote] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [voteStatus, setVoteStatus] = useState(null); // null, 'upvoted', or 'downvoted'

  const handleShare = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000); // Show "Copied!" for 2 seconds
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const toggleUpvote = () => {
    if (voteStatus === 'upvoted') {
      setUpvoteCount(upvoteCount - 1);
      setVoteStatus(null);
    } else {
      setUpvoteCount(upvoteCount + 1);
      if (voteStatus === 'downvoted') setDownvoteCount(downvoteCount - 1);
      setVoteStatus('upvoted');
    }
  };

  const toggleDownvote = () => {
    if (voteStatus === 'downvoted') {
      setDownvoteCount(downvoteCount - 1);
      setVoteStatus(null);
    } else {
      setDownvoteCount(downvoteCount + 1);
      if (voteStatus === 'upvoted') setUpvoteCount(upvoteCount - 1);
      setVoteStatus('downvoted');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md flex flex-col border-l-4 border-purple-600 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-purple-700 hover:underline">
            {name}
          </a>
          <p className={`text-sm font-medium ${difficulty === 'Hard' ? 'text-red-600' : difficulty === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
            Difficulty: {difficulty}
          </p>
          <p className="text-gray-500">Total Submissions: {totalSubmissions}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="text-sm bg-purple-500 text-white h-6 px-3 py-1 rounded hover:bg-purple-600"
          >
            {showCopied ? 'Copied!' : 'Share'}
          </button>
          <label className="flex items-center text-purple-600">
            <input type="checkbox" defaultChecked={false} className="mr-2" />
            Solved
          </label>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-purple-600 hover:text-purple-700 focus:outline-none"
          >
            <FaClipboard size={18} />
          </button>
        </div>
      </div>
      <div className="flex justify-end space-x-4 items-center text-gray-500">
        <button
          onClick={toggleUpvote}
          className={`flex items-center space-x-1 ${voteStatus === 'upvoted' ? 'text-purple-600' : ''}`}
        >
          <FaArrowUp size={18} />
          <span>{upvoteCount}</span>
        </button>
        <button
          onClick={toggleDownvote}
          className={`flex items-center space-x-1 ${voteStatus === 'downvoted' ? 'text-purple-600' : ''}`}
        >
          <FaArrowDown size={18} />
          <span>{downvoteCount}</span>
        </button>
      </div>
      
      {showNotes && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Notes:</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a personal note..."
            className="w-full mt-1 p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}
    </div>
  );
}

export default Question;
