import React, { useState, useEffect } from "react";
import axios from "axios";

function Draft({ user, nextEvent }) {
  const [lineUp, setLineUp] = useState();

  function getLineUp() {
    axios
      .get(`http://localhost:5000/startGrid/${nextEvent.raceID}`)
      .then(function (res) {
        if (res.data == null) {
          console.log("running postLineUp");
          postLineUp();
        } else {
          setLineUp(res.data.grid);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function postLineUp() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nascar-ot3/mc/races/${nextEvent.raceID}/starting_grid.json?api_key=pkgdvzk982juwdv4x7uuuxhw`
      )
      .then(function (res) {
        if (res.data == null) {
          console.log("Starting Lineup has not been set by NASCAR yet");
        } else {
          let grid = {
            name: nextEvent.raceName,
            raceID: nextEvent.raceID,
            grid: res.data.starting_grid,
          };
          axios
            .post("http://localhost:5000/startGrid/add", grid)
            .then(function (res) {
              console.log("grid added", grid.grid);
              setLineUp(grid.grid);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function selectedDriver(id) {
    var elem = document.getElementById(id);
    elem.classList.add("selected");
  }

  useEffect(() => {
    if (nextEvent.raceID) getLineUp();
  }, [nextEvent.raceID]);

  console.log("draft lineup", lineUp);

  if (lineUp) {
    return (
      <div className="Page">
        <div className="draftBoard">
          {lineUp.map((startingSpot) => (
            <div
              key={startingSpot.position}
              id={startingSpot.position}
              className="draftCard"
            >
              <h4>{startingSpot.position})</h4>
              <button
                className="cardButton"
                onClick={() => selectedDriver(startingSpot.position)}
              >
                Select
              </button>
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
