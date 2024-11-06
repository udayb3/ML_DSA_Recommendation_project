import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async ({ username, email, password, confirmPassword }) => {
        const success = handleInputError({ username, email, password, confirmPassword });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName: username, email, password })
            })
            const data = await res.json();
            if (!data.success) { 
                toast.error(data.message);
            }
            if (data.success && !res.ok) {
                toast.error(data.error);
            }
            if (data.success && res.ok) {              
                dispatch({ type: 'LOGIN', payload: data });
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    return { loading, signup };
}

function handleInputError({ username, email, password, confirmPassword }) {
    if (!username || !email || !password || !confirmPassword) {
        toast.error('All fields are required');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    if (password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return false;
    }
    return true;
}


export default useSignup