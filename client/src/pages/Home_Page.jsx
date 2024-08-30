import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";

const Home_Page = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);

  const handleLogout = () => {
    removeCookie("login_token");
    dispatch(logoutSuccess());
  };

  return (
    <>
      {cookies.login_token ? (
        <div>
          <h1>Hello {currentUser.username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to={"/login"}>Please Login</Link>
      )}
    </>
  );
};

export default Home_Page;
