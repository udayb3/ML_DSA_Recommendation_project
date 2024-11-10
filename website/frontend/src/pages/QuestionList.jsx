import Question from '../components/Question';
import { getQuestions } from '../api/questions.js';
import { FaArrowLeft , FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';


const QuestionList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['questions', page+1],
    queryFn: () => getQuestions(page+1),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['questions', page + 1],
        queryFn: () => getQuestions(page + 1),
      })
    }
  }, [data, isPlaceholderData, page, queryClient])

  return (
    <>
      <div className="space-y-4">
        {status === 'pending' ? (
          <div>Loading...</div>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data.questions.map((question) => (
              <>
                <Question key={question.qId} {...question} />
                <br />
              </>
            ))}
          </div>
        )}
      </div>
      <div className='mb-4 flex flex-row align-center'>
        <button className='inline-block mt-2 cursor-pointer text-purple-700 hover:text-purple-900 hover:font-semibold rounded-md px-4 py-3 text-center text-sm font-semibold transition duration-200 ease-in-out'
        onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
          <FaArrowLeft className='text-xl ' />
        </button>
        <span className='mb-4 mt-5 '>Page {page + 1}</span>{' '}
        <button className='inline-block mt-2 cursor-pointer text-purple-700 hover:text-purple-900 hover:font-semibold rounded-md px-4 py-3 text-center text-sm font-semibold  transition duration-200 ease-in-out'
          onClick={() => {
            setPage((old) => (data?.hasMore ? old + 1 : old))
          }}
          disabled={isPlaceholderData || !data?.hasMore}>
          <FaArrowRight className='text-xl '  />
        </button>
      </div>
    </>
  )
}

export default QuestionList;
