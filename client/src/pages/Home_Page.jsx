import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";
import moment from "moment";

const Home_Page = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  console.log(currentUser);

  const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);

  const handleLogout = () => {
    removeCookie("login_token");
    dispatch(logoutSuccess());
  };

  return (
    <>
      {!cookies.login_token ? (
        <Link to={"/login"}>Please Login</Link>
      ) : (
        <div>
          <h1>Hello {currentUser.username}</h1>
          <h1>Last Login : {moment(currentUser.last_login).format("LLL")}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Home_Page;
