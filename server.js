const express = require('express');
const app = express();
const fs = require('fs');
const { postgrator } = require('./config/db');
require('dotenv').config();

const dir = './recordings'

fs.mkdir(dir, (err) => {
  if(err){
    console.log('The directory already exists!')
  } else {
    console.log('Successfully created a new directory')
  }
})

app.use(express.json({limit: '500mb'}));

// use Routes
app.use('/webhook', require('./routes/webhook.js'))

postgrator.migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`server is listening at http://${process.env.HOST}:${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));
