export const upvoted = async (username, qId) => {
    const response = await fetch(`/api/user/upvote`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qId }),
    });
    if (!response.ok) {
        throw new Error('Could not upvote question');
    }
    const data = await response.json();
    return data;
}

export const downvoted = async (username, qId) => {
    const response = await fetch(`/api/user/downvote`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qId }),
    });
    if (!response.ok) {
        throw new Error('Could not downvote question');
    }
    const data = await response.json();
    return data;
}

export const solved = async (username, qId) => {
    const response = await fetch(`/api/user/solved`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qId }),
    });
    const data = await response.json();
    if(!data.success){
        throw new Error('Could not mark question as solved');
    }
    // console.log(data);
    return data;
}

export const addedNote = async (username, qId, note) => {
    const response = await fetch(`/api/user/note`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qId, note }),
    });
    if (!response.success) {
        throw new Error('Could not add the note');
    }
    const data = await response.json();
    return data;
}

export const getVoteStatus = async (username, qId) => {
    const response = await fetch(`/api/user/voteStatus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qId }),
    });
    if (!response.ok) {
        throw new Error('Could not retrieve vote status');
    }
    const data = await response.json();
    return data.status;
};

export const getSolvedStatus = async (username, qId) => {
    const response = await fetch(`/api/user/solvedStatus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qId }),
    });
    if (!response.ok) {
        throw new Error('Could not retrieve solved status');
    }
    const data = await response.json();
    return data.status; 
}