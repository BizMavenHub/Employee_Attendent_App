import React from "react";
import moment from "moment";

import "../styles/components/recordCard.css";

const RecordCard = ({ loginTime, logoutTime }) => {
  const calculateDuration = () => {
    let Duration = 0;
    const loginTimeToHour = new Date(loginTime).getTime() / 1000 / 60 / 60;
    const logoutTimeToHour = new Date(logoutTime).getTime() / 1000 / 60 / 60;
    Duration = logoutTimeToHour - loginTimeToHour;
    return Duration;
  };

  return (
    <div className="record-card">
      <div>
        <p>Date: {moment(loginTime).format("DD/MM/YYYY")}</p>
        <p>Login: {moment(loginTime).format("hh:mm A")}</p>
        <p>
          {logoutTime
            ? `Logout: ${moment(logoutTime).format("hh:mm A")}`
            : "Logout: Not Yet Available"}
        </p>
      </div>
      <div>
        <p>
          {loginTime && logoutTime
            ? `Duration: ${calculateDuration().toFixed(2)}`
            : "Duration: Not Yet Available"}
        </p>
      </div>
    </div>
  );
};

export default RecordCard;
