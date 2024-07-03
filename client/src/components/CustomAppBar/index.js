import React from "react";
import { useNavigate } from "react-router-dom";

const CustomAppBar = ({ setSelectedPage, selectedPage }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getTextStyle = (pageIndex) => ({
    fontWeight: selectedPage === pageIndex ? 'bold' : 'normal',
  });

return (
    <div className="bg-primary h-16 flex items-center px-4 justify-between">
        <h1 className="text-white font-extrabold cursor-pointer" onClick={() => setSelectedPage(0)}>Bulk Mail Sender</h1>
        <div className="flex gap-8">
            <p className={`${getTextStyle(0)} cursor-pointer text-white`} onClick={() => setSelectedPage(0)}>Bulk Mail Sender</p>
            <p className={`${getTextStyle(1)} cursor-pointer text-white`} onClick={() => setSelectedPage(1)}>My Images</p>
            <p className="text-white cursor-pointer" onClick={onLogout}>Logout</p>
        </div>
    </div>
);
};

export default CustomAppBar;