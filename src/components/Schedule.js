import React from "react";

//Maps list of scheduled events
function Schedule({ schedule }) {
  if (schedule) {
    return (
      <div className="Page" data-testid="SchedulePage">
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
                  hour: "2-digit",
                  minute: "2-digit",
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
