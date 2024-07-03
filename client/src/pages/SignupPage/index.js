import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    const payload = { email, password }
    axios.post("http://localhost:9999/user/signup", payload).then((res) => {
      console.log("res",res)
      if (res.data.status === 200) {
        alert(res.data.msg)
        navigate('/');
      }else{
        alert(res.data.msg);
      }
    })

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
        <input
          type="text"
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="bg-primary text-white py-2 px-4 rounded w-full"
        >
          Register
        </button>

        <div className='flex justify-center mt-2'>
          <p>Already have an Account? </p>
          <p className='text-primary cursor-pointer ml-1' onClick={() => { navigate('/') }}>Sign in</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
