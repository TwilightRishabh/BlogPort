import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 rounded-full bg-blue-600 text-white
                  hover:text-white hover:bg-gray-800 transition-all duration-200 
                 shadow-sm hover:shadow-md"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
