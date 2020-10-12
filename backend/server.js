const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require("body-parser")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// MongoClient.connect(uri, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('daytona')
//     const eventsCollection = db.collection('events')

//     app.post('/events', (req, res) => {
//         eventsCollection.insert(req.body)
//           .then(result => {
//             console.log("from server",result)
//           })
//           .catch(error => console.error(error))
//       })
//   })
//   .catch(console.error)

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const eventsRouter = require('./routes/events');

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/events', eventsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});