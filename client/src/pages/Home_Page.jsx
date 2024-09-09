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
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getUserTimeLogs();
    getEmployees();
  }, [cookies.access_token]);

  async function getUserTimeLogs() {
    try {
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
        throw new Error(data.message);
      }

      setUserTimeLogs(data.timeLog);
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmployees() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/employee`,
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

      setEmployees(data.employees);
    } catch (error) {
      console.log(error);
    }
  }

  const AdminContext = () => {
    return (
      <div className="main_container">
        {/* <Link to="/add-employee">Add Employee</Link> */}

        <div className="total-employees">
          <p>Total employees: {employees.length}</p>
        </div>

        <div className="btn-container">
          <Link className="add-employee-btn" to="/admin/add-employee">
            Add Employee
          </Link>
          <Link
            className="search-user-statistic-btn"
            to="/admin/search-user-statistic"
          >
            Search User Statistic
          </Link>
          <Link
            className="personal-statistic-btn"
            to="/admin/personal-statistic"
          >
            Personal Statistic
          </Link>
        </div>

        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Employee Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.username}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const EmployeeContext = () => {
    return (
      <div className="main_container">
        {userTimeLogs.length > 0 ? (
          userTimeLogs.map((timeLog) => (
            <RecordCard
              key={timeLog._id}
              loginTime={timeLog.loginTime}
              logoutTime={timeLog.logoutTime}
            />
          ))
        ) : (
          <p>No records found</p>
        )}
      </div>
    );
  };

  return (
    <>
      {!cookies.access_token ? (
        <div>
          <Link to={"/login"}>Please Login</Link>
        </div>
      ) : (
        <div className="home_page_logged_in_container">
          <Heading />
          <div>
            {currentUser.isAdmin ? <AdminContext /> : <EmployeeContext />}
            <Narbar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home_Page;
