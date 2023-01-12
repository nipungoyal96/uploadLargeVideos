const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const uploadVideoRoute = require("./routes/uploadVideo-route");
const downloadVideoRoute = require("./routes/downloaVideoRoute.js");


require('dotenv').config();
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });


  app.use('/uploadVideos', uploadVideoRoute);
  app.use('/downloadVideos', downloadVideoRoute);
  
  app.use((req, res, next) => {
   const error = new HttpError('Could not find this route.', 404);
   throw error;
 });

 app.use((error, req, res, next) => {
  
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

  mongoose
    .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
