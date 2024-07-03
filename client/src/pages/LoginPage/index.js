import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    const payload = { email, password }
    axios.post("http://localhost:9999/user/signin", payload).then((res) => {
      console.log("res",res)
      if (res.data.status === 200) {  
        localStorage.setItem("token",res.data.token)      
        navigate('/home',{ state: { email: email } });
      }else{
        alert(res.data.msg);
      }
    })
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
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
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-primary cursor-pointer flex justify-end my-2" onClick={()=>navigate('/forgotPassword')}>
          Forgot Password
        </p>

        <button
          onClick={handleLogin}
          className="bg-primary text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>

        <div className="flex justify-center mt-2">
          <p>Already have an Account? </p>
          <p
            className="text-primary cursor-pointer ml-1"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
