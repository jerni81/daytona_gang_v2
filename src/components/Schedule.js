import React from "react";
import { useHistory } from "react-router-dom";

function Schedule({ schedule }) {
  let history = useHistory();

  if (schedule) {
    return (
      <div className="Page">
        {/* <button onClick={() => history.push("/dashboard")}>Dashboard</button> */}
        {schedule.map((event) => (
          <div key={event.id} className="schedule">
            <b>{event.name}</b>
            {event.races.map((race) => (
              <div key={race.id}>
                {race.name}
                <br />
                {new Date(race.scheduled).toLocaleTimeString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="Page">
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      <h1>Schedule</h1>
      this
    </div>
  );
}

export default Schedule;
