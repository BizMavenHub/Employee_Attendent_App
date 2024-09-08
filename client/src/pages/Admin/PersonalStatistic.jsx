import React, { useEffect, useState } from "react";
import BackBtn from "../../components/BackBtn";
import moment from "moment";

import { useSelector } from "react-redux";

import "../../styles/admin/personalStatistic.css";

const PersonalStatistic = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [userTimeLogs, setUserTimeLogs] = useState([]);

  useEffect(() => {
    getUserTimeLogs();
  }, []);

  async function getUserTimeLogs() {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/timeLog/${currentUser._id}`,
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
        setLoading(false);
        return new Error(data.message);
      }

      setUserTimeLogs(data.timeLog);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <BackBtn />
          <h1>Personal Statistic</h1>
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
              {userTimeLogs.map((timeLog) => (
                <tr key={timeLog._id}>
                  <td>{moment(timeLog.date).format("DD/MM/YYYY - ddd")}</td>
                  <td>{moment(timeLog.loginTime).format("hh:mm A")}</td>
                  <td>
                    {timeLog.logoutTime
                      ? moment(timeLog.logoutTime).format("hh:mm A")
                      : "Not Yet Available"}
                  </td>
                  <td>{timeLog.duration ? timeLog.duration.toFixed(2) : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PersonalStatistic;
