import React, { useState, useEffect } from "react";
import axios from "axios";

function Draft({ user, nextEvent }) {
  const [lineUp, setLineUp] = useState();
  const [bracket, setBracket] = useState({
    uid: null,
    raceID: null,
    driver1: null,
    driver2: null,
  });

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
        if (res.data.starting_grid.length == 0) {
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

  function selectedDriver(id, name, number) {
    var elem = document.getElementById(id);
    elem.classList.add("selected");
    if (bracket.driver1 == null) {
      setBracket({ ...bracket, driver1: { name: name, number: number } });
    }
    if (bracket.driver1 !== null && bracket.driver2 == null) {
      setBracket({ ...bracket, driver2: { name: name, number: number } });
    }
    console.log(bracket);
  }

  async function postBracket() {
    let fullBracket = {
      uid: user.uid,
      bracket,
    };
    console.log("fullbrack", fullBracket);
    axios
      .put(`http://localhost:5000/users/${user.uid}`, fullBracket)
      .then((res) => {
        console.log("bracket placed", res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (bracket.driver2 !== null) {
      postBracket();
    }
  }, [bracket.driver2]);

  useEffect(() => {
    if (nextEvent.raceID) getLineUp();
    setBracket({ ...bracket, raceID: nextEvent.raceID, uid: user.uid });
  }, [nextEvent.raceID]);

  // console.log("draft lineup", nextEvent);
  // console.log("Drafts", bracket);

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
                onClick={() =>
                  selectedDriver(
                    startingSpot.position,
                    startingSpot.driver.full_name,
                    startingSpot.car.number
                  )
                }
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
      <div className="Page" data-testid="NextEvent">
        <h3>
          Next Up <br /> {nextEvent.name} <br /> for the <br />{" "}
          {nextEvent.raceName} <br /> on <br />{" "}
          {new Date(nextEvent.startTime).toLocaleTimeString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
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
