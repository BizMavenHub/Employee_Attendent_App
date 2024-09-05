import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../styles/home_page.css";

import Narbar from "../components/Navbar";
import Heading from "../components/Heading";
import RecordCard from "../components/RecordCard";

const Home_Page = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [userTimeLogs, setUserTimeLogs] = useState([]);

  async function getUserTimeLogs() {
    try {
      const res = await fetch(
        `http://localhost:3000/timeLog/${currentUser._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUserTimeLogs(data.timeLog);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserTimeLogs();

    console.log(userTimeLogs);
  }, [cookies.access_token]);

  return (
    <>
      {!cookies.access_token ? (
        <div>
          <Link to={"/login"}>Please Login</Link>
        </div>
      ) : (
        <div className="home_page_logged_in_container">
          <Heading />
          <div className="main_container">
            {userTimeLogs.map((timeLog, index) => (
              <RecordCard
                key={index}
                loginTime={timeLog.loginTime}
                logoutTime={timeLog.logoutTime}
              />
            ))}
          </div>
          <Narbar />
        </div>
      )}
    </>
  );
};

export default Home_Page;
