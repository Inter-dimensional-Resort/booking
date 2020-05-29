require('newrelic');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('../db/index');
// const sequelize = require('../db/index-sequelize.js');


const app = express();
const port = 3333;
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());

app.get('/room', (req, res) => {
  db.getRoom(req.query.id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

app.get('/booking', (req, res) => {
  db.getBooking(req.query.id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});


app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
