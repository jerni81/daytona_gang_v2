const router = require("express").Router();
let SingleEvent = require("../models/events.model");

router.route("/").get((req, res) => {
  SingleEvent.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.post('/seed', (req, res)=>{
//     res.send(req.body)
//     console.log('data: ', req.body);
//  });

module.exports = router;
