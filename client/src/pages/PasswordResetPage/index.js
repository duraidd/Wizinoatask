import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; 
  const[password, setPassword] = React.useState('')

  const handleReset = () => {
    axios
    .post("http://localhost:9999/user/passwordUpdate", { email, password })
    .then((res) => {
      if(res.data.status ===200){
          navigate("/");  
      }
      else{
          alert(res.data.msg)
      }
  
  });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Enter New Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />

        <button
            onClick={handleReset}
          className="bg-primary text-white py-2 px-4 rounded w-full"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
