export const getQuestions = async (page, limit=3) => {
    const response = await fetch(`/api/questions/?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Could not fetch questions');
    }
    const data = await response.json();
    return data;
};