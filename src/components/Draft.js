import React, { useState, useEffect } from "react";
import axios from "axios";

function Draft({ user, nextEvent }) {
  const [lineUp, setLineUp] = useState();

  function getLineUp() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nascar-ot3/mc/races/0e4f8347-c661-4fb7-a1c7-b9726b641e27/starting_grid.json?api_key=pkgdvzk982juwdv4x7uuuxhw"
      )
      .then(function (res) {
        setLineUp(res.data.starting_grid);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getLineUp();
  }, []);

  console.log("draft lineup", lineUp);
  if (lineUp) {
    return (
      <div className="Page">
        <div className="draftBoard">
          {lineUp.map((startingSpot) => (
            <div key={startingSpot.position} className="draftCard">
              <h4>{startingSpot.position})</h4>
              <div>
                {startingSpot.driver.full_name} {startingSpot.car.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (nextEvent) {
    return (
      <div className="Page">
        <h3>
          Next Up <br /> {nextEvent.name} <br /> for the <br />{" "}
          {nextEvent.raceName} <br /> on <br />{" "}
          {new Date(nextEvent.startTime).toLocaleTimeString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
      </div>
    );
  }
  return (
    <div className="Page">
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      <h1>Draft</h1>
      this
    </div>
  );
}

export default Draft;
