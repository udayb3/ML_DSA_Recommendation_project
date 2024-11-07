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
    if (!response.success) {
        throw new Error('Could not mark question as solved');
    }
    const data = await response.json();
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