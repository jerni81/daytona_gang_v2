import React from "react";
import { useHistory } from "react-router-dom";

function Schedule({ schedule }) {
  let history = useHistory();
  console.log("scedule page", schedule.events);

  if (schedule.events) {
    return (
      <div className="Schedule">
        <button onClick={() => history.push("/dashboard")}>Dashboard</button>
        {schedule.events.map((event) => (
          <div key={event.id}>
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
            <br />
          </div>
        ))}
      </div>
    );
  }
  return <div>not here</div>;
}

export default Schedule;
