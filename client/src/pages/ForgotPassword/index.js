import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const handleLogin = () => {
    axios.post("http://localhost:9999/user/forgotpwd",{email}).then((res) => {
      console.log("res", res);
      navigate("/otp",{ state: { email: email } });
    })
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4">Enter your registered Email</h1>
        <input
          type="text"
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-primary text-white py-2 px-4 rounded w-full"
        >
          Get OTP to Reset Password
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;
