const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');  
const axios = require('axios');
const { postgrator } = require('./config/db');
require('dotenv').config();
// console.log(process.env.PORT, process.env.HOST);

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

// use Routes
app.use('/webhook', require('./routes/webhook.js'))

// const returned = downloadImage();
// console.log(returned);
// returned.then(msg => console.log(msg));
// returned.catch(msg => console.log(msg));

postgrator.migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`server is listening at http://${process.env.HOST}:${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));