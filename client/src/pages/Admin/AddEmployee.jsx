import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import BackBtn from "../../components/BackBtn";

import "../../styles/admin/addEmployee.css";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {}, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/employee/add-employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(employeeData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
      }

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {}
  }

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <BackBtn />
      <div className="add-employee-container">
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="first-last-name-group">
            <div className="firstName-group">
              <p htmlFor="firstName">FirstName</p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                value={employeeData.firstName}
                required
              />
            </div>
            <div className="lastName-group">
              <p htmlFor="lastName">LastName</p>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                value={employeeData.lastName}
                required
              />
            </div>
          </div>
          <div className="email-group">
            <p htmlFor="email">Email</p>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={employeeData.email}
              required
            />
          </div>
          <div className="password-group">
            <p htmlFor="password">Password</p>
            <input
              type="password"
              name="password"
              id="password-employee"
              onChange={handleChange}
              value={employeeData.password}
              required
            />
          </div>
          <div className="phoneNumber-group">
            <p htmlFor="phoneNumber">PhoneNumber</p>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              value={employeeData.phoneNumber}
              required
            />
          </div>
          <div className="birthday-role-group">
            <div className="birthday-group">
              <p htmlFor="birthday">Birthday</p>
              <input
                type="date"
                name="birthday"
                id="birthday"
                onChange={handleChange}
                value={employeeData.birthday}
                required
              />
            </div>
            <div className="role-group">
              <p htmlFor="role">Role</p>
              <input
                type="text"
                name="role"
                id="role"
                onChange={handleChange}
                value={employeeData.role}
                required
              />
            </div>
          </div>
          <div className="hourlyRate-group">
            <p htmlFor="hourlyRate">HourlyRate</p>
            <input
              type="number"
              name="hourlyRate"
              min="0"
              step="0.0001"
              max="10000000000000000000"
              id="hourlyRate"
              onChange={handleChange}
              value={employeeData.hourlyRate}
            />
          </div>
          <input type="submit" value="Add Employee" />
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
