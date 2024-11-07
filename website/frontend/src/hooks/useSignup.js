import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from './useAuthContext';
import * as auth from '../api/auth';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async ({ username, email, password, confirmPassword }) => {
        const success = handleInputError({ username, email, password, confirmPassword });
        if (!success) return;
        setLoading(true);
        try {
            const data = await auth.register({ username, email, password });
            if (data && data.success) {              
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