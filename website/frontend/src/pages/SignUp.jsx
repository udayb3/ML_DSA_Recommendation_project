import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

function SignUp() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const showPassword = () => {
    var x = document.getElementById("password");
    var y = document.getElementById("confirmPassword");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
          Sign Up for 
          <span className="text-purple-600"> Leetforces</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter Your username"
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Email ID</label>
            <input
              type="email"
              placeholder="Enter Email ID"
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              id="password"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              id="confirmPassword"
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              onClick={showPassword}
              className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Show Password</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <span>Already have an account?</span>
            <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md font-medium text-center hover:bg-purple-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
