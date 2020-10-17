const router = require("express").Router();
let SingleGrid = require("../models/startGrid.model");

router.route("/").get((req, res) => {
  SingleGrid.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const grid = req.body;

  const newGrid = new SingleGrid(grid);

  newGrid
    .save()
    .then(() => res.json("Grid added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:raceID").get((req, res) => {
  let id = req.params.raceID;
  SingleGrid.findOne({ raceID: id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
