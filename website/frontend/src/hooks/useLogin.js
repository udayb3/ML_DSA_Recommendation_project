import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from './useAuthContext'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext();
    
    const login = async (email, password) => {
        const success = handleInputError(email, password);
        if (!success) return;
        
        setLoading(true)
        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json();
            if (!data.success) {
                toast.error(data.message)
                return;
            }
            dispatch({ type: "LOGIN", payload: data })
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

function handleInputError(email, password) {
    if (!email || !password) {
        toast.error('All fields are required');
        return false;
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
        toast.error('Invalid email');
        return false;
    }
    return true;
}

export default useLogin