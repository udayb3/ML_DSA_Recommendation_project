import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import { getQuestions } from '../api/questions.js';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useQuery, useQueryClient } from '@tanstack/react-query';

const QuestionList = ({ searchResults, loading }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['questions', page + 1],
    queryFn: () => getQuestions(page + 1),
    enabled: !searchResults,
    placeholderData: [],
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  const questionsToRender = searchResults || (data ? data.questions : []);

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['questions', page + 1],
        queryFn: () => getQuestions(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return (
    <>
      <div className="space-y-4">
        {loading ? (
          <div>Loading search results...</div>
        ) : searchResults && searchResults.length === 0 ? (
          <div>No results found</div>
        ) : status === 'pending' || isFetching ? (
          <div>Loading questions...</div>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {questionsToRender.map((question) => (
              <div key={question.qId}>
                <Question {...question} />
                <br />
              </div>
            ))}
          </div>
        )}
      </div>

      {!searchResults && (
        <div className='mb-4 flex flex-row align-center'>
          <button
            className='inline-block mt-2 cursor-pointer text-purple-700 hover:text-purple-900 hover:font-semibold rounded-md px-4 py-3 text-center text-sm font-semibold transition duration-200 ease-in-out'
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            <FaArrowLeft className='text-xl' />
          </button>
          <span className='mb-4 mt-5 '>Page {page + 1}</span>
          <button
            className='inline-block mt-2 cursor-pointer text-purple-700 hover:text-purple-900 hover:font-semibold rounded-md px-4 py-3 text-center text-sm font-semibold  transition duration-200 ease-in-out'
            onClick={() => {
              setPage((old) => (data?.hasMore ? old + 1 : old));
            }}
            disabled={isPlaceholderData || !data?.hasMore}
          >
            <FaArrowRight className='text-xl' />
          </button>
        </div>
      )}
    </>
  );
};

export default QuestionList;
