import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; 
  const [otp, setOtp] = React.useState("");

  const handleVerify = () => {
    axios
      .post("http://localhost:9999/user/verifyotp", { email, otp })
      .then((res) => {
        if(res.data.status ===200){
            navigate("/passwordReset", { state: { email: email } });  
        }
        else{
            alert(res.data.msg)
        }
    
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Enter the Received OTP From Mail
        </h1>
        <input
          type="text"
          placeholder="Enter OTP"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="bg-primary text-white py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OTPPage;