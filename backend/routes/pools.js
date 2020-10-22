const router = require("express").Router();
let Pool = require("../models/pool.model");

router.route("/").get((req, res) => {
  Pool.find()
    .then((pools) => res.json(pools))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:raceID").get((req, res) => {
  let id = req.params.raceID;
  Pool.findOne({ raceID: id })
    .then((pool) => res.json(pool))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:raceID").put((req, res) => {
  let id = req.params.raceID;
  let bracket = req.body;
  console.log("params", req.body);
  Pool.findOneAndUpdate({ raceID: id }, { $push: { brackets: bracket } })
    .then((pool) => res.json(pool))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const pool = req.body;

  const newPool = new Pool(pool);

  newPool
    .save()
    .then(() => res.json("Pool added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
