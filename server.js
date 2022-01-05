const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');  
const axios = require('axios');
const { postgrator } = require('./config/db');
require('dotenv').config();

// use Routes
app.use('/webhook', require('./routes/webhook'))

postgrator.migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`server is listening at http://${process.env.HOST}:${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));