export const login = async (email, password) => {
    const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json();
    if(!data.success){
        toast.error(data.message);
        return;
    }
    if(data.success && !res.ok){
        toast.error(data.error);
        return;
    }
    return data;
}

export const register = async ({username, email, password}) => {
    const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    const data = await res.json();
    if(!data.success){
        toast.error(data.message);
        return;
    }
    if(data.success && !res.ok){
        const data = await res.json();
        toast.error(data.error);
        return;
    }
    return data;
}