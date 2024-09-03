import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";
import moment from "moment";
import "../styles/home_page.css";
import Narbar from "../components/Navbar";
import Heading from "../components/Heading";

const Home_Page = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  return (
    <>
      {!cookies.access_token ? (
        <div>
          <Link to={"/login"}>Please Login</Link>
        </div>
      ) : (
        <div className="home_page_logged_in_container">
          <Heading />
          <div className="main_container"></div>
          <Narbar />
        </div>
      )}
    </>
  );
};

export default Home_Page;
