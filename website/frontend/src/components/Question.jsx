import React, { useEffect, useState } from 'react';
import * as userApi from '../api/user.js';
import { useAuthContext } from '../hooks/useAuthContext'
import { FaArrowUp, FaArrowDown, FaClipboard } from 'react-icons/fa';

function Question({ qId, name, link, difficulty, upvotes, downvotes, solved, totalSolved }) {
  const [note, setNote] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [userVote, setUserVote] = useState(0);
  const [solvedStatus, setSolvedStatus] = useState(solved);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchVoteStatus = async () => {
      try {
        const status = await userApi.getVoteStatus(user.user.username, qId);
        // console.log(status);
        setUserVote(status);
      } 
      catch (err) {
        console.error('Failed to fetch vote status: ', err);
      }
    }
    const fetchSolvedStatus = async () => {
      try {
        const status = await userApi.getSolvedStatus(user.user.username, qId);
        // console.log(status);
        setSolvedStatus(status);
      } 
      catch (err) {
        console.error('Failed to fetch vote status: ', err);
      }
    }
    fetchVoteStatus();
    fetchSolvedStatus();
  },[]);


  const handleUpvote = () => {
    const updateUpvote = async() => await userApi.upvoted(user.user.username, qId);
    updateUpvote();
    if (userVote === 1) {
      setUpvoteCount(upvoteCount - 1);
      setUserVote(0);
    } else if (userVote === -1) {
      setUpvoteCount(upvoteCount + 1);
      setDownvoteCount(downvoteCount - 1);
      setUserVote(1);
    }
    else {
      setUpvoteCount(upvoteCount + 1);
      setUserVote(1);
    }
  };

  const handleDownvote = () => {
    const updateDownvote = async() => await userApi.downvoted(user.user.username, qId);
    updateDownvote();
    if (userVote === -1) {
      setDownvoteCount(downvoteCount - 1);
      setUserVote(0);
    } else if (userVote === 1) {
      setDownvoteCount(downvoteCount + 1);
      setUpvoteCount(upvoteCount - 1);
      setUserVote(-1);
    }
    else {
      setDownvoteCount(downvoteCount + 1);
      setUserVote(-1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000); // Show "Copied!" for 2 seconds
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const handleSolve = async () => {
    const updateSolved = async() => await userApi.solved(user.user.username, qId);
    setSolvedStatus((solvedStatus) => !solvedStatus);
    updateSolved();
  }

  const handleNote = async (e) => {
    e.preventDefault();
    setNote(e.target.value);
  }


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
          <p className="text-gray-500">Total Submissions: {totalSolved}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="text-sm bg-purple-500 text-white h-6 px-3 py-1 rounded hover:bg-purple-600"
          >
            {showCopied ? 'Copied!' : 'Share'}
          </button>
          <label className="flex items-center text-purple-600">
            <input type="checkbox" defaultChecked={solvedStatus} className="mr-2" onChange={handleSolve} />
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
          onClick={handleUpvote}
          className={`flex items-center space-x-1 ${userVote === 1 ? 'text-purple-600' : ''}`}
        >
          <FaArrowUp size={18} />
          <span>{upvoteCount}</span>
        </button>
        <button
          onClick={handleDownvote}
          className={`flex items-center space-x-1 ${userVote === -1 ? 'text-purple-600' : ''}`}
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
            onChange={handleNote}
            placeholder="Write a personal note..."
            className="w-full mt-1 p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}
    </div>
  );
}

export default Question;
