import React, { useState } from "react";

import moment from "moment";
import BackBtn from "../../components/BackBtn";

import "../../styles/admin_styles/searchEmployeeStatistic.css";

const SearchUserStatistic = () => {
  const [employeeLogTimes, setEmployeeLogTimes] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [employeeID, setEmployeeID] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  async function getEmployeeTimeLog(Employee_ID) {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/timeLog/${Employee_ID}`
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        throw new Error(data.message);
      }

      setEmployeeLogTimes(data.timeLog);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getEmployeeInfo(Employee_ID) {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/employee/${Employee_ID}`
      );

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        throw new Error(data.message);
      }

      setEmployeeInfo(data.employee);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    setIsSearched(true);

    getEmployeeTimeLog(employeeID);
    getEmployeeInfo(employeeID);
  }

  return (
    <div>
      <BackBtn />
      <h1>SearchUserStatistic</h1>
      <div className="search_container">
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Employee ID"
            onChange={(e) => setEmployeeID(e.target.value)}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </form>
      </div>

      {isSearched && (
        <div className="display_container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <div className="employee_info_container">
                <div className="image-container">
                  <img src={employeeInfo.profilePicture} alt="employee image" />
                </div>
                <div className="info-container">
                  <p>{employeeInfo.username}</p>
                  <p>{employeeInfo.email}</p>
                  <p>
                    Last Login:{" "}
                    {moment(employeeInfo.joinDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Login Time</th>
                    <th>Logout Time</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeLogTimes.map((timeLog) => (
                    <tr key={timeLog._id}>
                      <td>
                        {moment(timeLog.loginTime).format("DD/MM/YYYY - ddd")}
                      </td>
                      <td>{moment(timeLog.loginTime).format("hh:mm A")}</td>
                      <td>
                        {timeLog.logoutTime
                          ? moment(timeLog.logoutTime).format("hh:mm A")
                          : "Not Yet Available"}
                      </td>
                      <td>
                        {timeLog.duration ? timeLog.duration.toFixed(2) : 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUserStatistic;
