import React from "react";
import { Link } from "react-router-dom";
import "../styles/profile_page.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";
import { useCookies } from "react-cookie";

import moment from "moment";

const Profile_Page = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);

  function handleLogout() {
    removeCookie("login_token");
    dispatch(logoutSuccess());
  }

  return (
    <div className="">
      <button className="back-btn">
        <Link to="/">
          <svg
            className="back-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </Link>
      </button>
      <div className="profile-page">
        <div className="profile-container">
          <div className="image-container">
            <img src="" alt="User-Image" />
          </div>
          <div className="info-container">
            <p>{currentUser.username}</p>
            <span>{moment(currentUser.last_login).format("LLL")}</span>
          </div>
          <div className="card-container">
            {/* Birthday card */}
            <div className="card">
              <div className="icon-container">
                <img src="" alt="icon" />
              </div>
              <p>Birthday</p>
            </div>

            {/* Phone Number card */}
            <div className="card">
              <div className="icon-container">
                <img src="" alt="icon" />
              </div>
              <p>Phone Number</p>
            </div>

            {/* Email card */}
            <div className="card">
              <div className="icon-container">
                <img src="" alt="icon" />
              </div>
              <p>Email</p>
            </div>

            {/* Monthly Income card */}
            <div className="card">
              <div className="icon-container">
                <img src="" alt="icon" />
              </div>
              <p>Monthly Income</p>
            </div>

            {/* Working Hours card */}
            <div className="card">
              <div className="icon-container">
                <img src="" alt="icon" />
              </div>
              <p>Working Hours</p>
            </div>
          </div>
        </div>
      </div>
      <div className="logout-btn-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile_Page;
