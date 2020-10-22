import React, { useState, useEffect } from "react";
import axios from "axios";

function Draft({ user, nextEvent }) {
  const [lineUp, setLineUp] = useState();
  const [bracket, setBracket] = useState({
    uid: null,
    raceName: null,
    raceID: null,
    driver1: null,
    driver2: null,
  });

  // Assumes starting grid has already been set and posted to MongoDB
  // If no starting grid is found then calls function to post a grid to MongoDB
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

  // Called in getLineUp if no data is returned from call
  // Gets data from sportradar.io trims it, and post a grid to MongoDB
  // Sets state for lineUp
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

  // onClick that sets drivers selectd to individuals bracket in state
  // and changes css property to show driver has already been picked
  function selectedDriver(id, name, number) {
    var elem = document.getElementById(id);
    elem.classList.add("selected");
    if (bracket.driver1 == null) {
      setBracket({ ...bracket, driver1: { name: name, number: number } });
    }
    if (bracket.driver1 !== null && bracket.driver2 == null) {
      setBracket({ ...bracket, driver2: { name: name, number: number } });
    }
    // console.log(bracket);
  }

  // Assumes pool already exist in MongoDB for the next event
  // If pool does not exist creates a pool for users to have their
  // indivdual brackets added to
  async function createPool() {
    axios
      .get(`http://localhost:5000/pools/${nextEvent.raceID}`)
      .then((res) => {
        // console.log("inside create pool", res);
        if (res.data == null) {
          let pool = {
            raceName: nextEvent.raceName,
            raceID: nextEvent.raceID,
            brackets: [],
          };
          axios
            .post("http://localhost:5000/pools/add", pool)
            .then(function (res) {
              console.log("pool added", pool);
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

  // Post individuals bracket to their own user profile in MongoDB
  // Waits for driver2 to be populated in state then post whole bracket object
  async function postBracket() {
    let fullBracket = {
      uid: user.uid,
      bracket,
    };
    // console.log("fullbrack", fullBracket);
    axios
      .put(`http://localhost:5000/users/${user.uid}`, fullBracket)
      .then((res) => {
        console.log("bracket placed", res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Post indivdual users picks to pool in MongoDB
  async function postToPool() {
    let userPicks = {
      uid: user.uid,
      userName: user.userName,
      driver1: bracket.driver1,
      driver2: bracket.driver2,
    };
    console.log("userPicks", userPicks);
    axios
      .put(`http://localhost:5000/pools/${nextEvent.raceID}`, userPicks)
      .then((res) => {
        console.log("picks placed to pool", res.data.brackets);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (bracket.driver2 !== null) {
      postBracket();
      postToPool();
    }
  }, [bracket.driver2]);

  useEffect(() => {
    if (nextEvent.raceID) getLineUp();
    createPool();
    console.log("calling create pool");
    setBracket({
      ...bracket,
      raceID: nextEvent.raceID,
      raceName: nextEvent.raceName,
      uid: user.uid,
    });
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
