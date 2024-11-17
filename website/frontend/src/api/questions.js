export const getQuestions = async (page, limit = 3) => {
  const response = await fetch(`/api/questions/?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Could not fetch questions");
  }
  const data = await response.json();
  return data;
};

export const getSimilarQuestions = async (qId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/questions/similar/${qId}`,
      {
        method: "GET",
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch similar questions");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};